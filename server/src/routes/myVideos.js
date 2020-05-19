import compact from "lodash/compact";
import isEmpty from "lodash/isEmpty";
import db from "../models";
import logger from "../lib/utils/logger";
import config from "../lib/variables/config";
import errorCodes from "../lib/variables/errorCodes";
import { makeSuccessFormat } from "../lib/utils/makeRespFormat";
import { getTedHtmlData, getTedLanguages, getTedVideoUrl, getTedMetaData, getTedTags, getTedTiming } from "../lib/utils/ted";

/**
 * [GET] 내 비디오 리스트 가져오기
 *
 * 1) Response
 * - list: [object]
 *    - videoId
 *    - title
 *    - author
 *    - thumbnail
 *    - duration
 */
export const getMyVideos = async (req, res, next) => {
  try {
    logger.info("getMyVideos - Request");
    const list = await db.myVideos.findAll();
    if (list !== null) {
      logger.info("getMyVideos - Success");
      res.send(makeSuccessFormat({ list }));
    }
  } catch (err) {
    next(err);
  }
};

/**
 * [PUT] Favorite 상태 수정
 *
 * 1) Request
 * - isFavorite: (boolean)
 *
 * 2) Response
 * - success
 */
export const editFavoriteStatus = async (req, res, next) => {
  try {
    logger.info("editFavoriteStatus - Request");
    const { user, videoId, isFavorite } = req.body;
    if (!videoId || typeof isFavorite !== "boolean") {
      logger.error("addMyVideo - Fail");
      return next(errorCodes["400"]);
    }

    const { uid } = user;
    const isUpdated = db.myVideos.update({ isFavorite }, { where: { uid, videoId } });
    if (isUpdated) {
      logger.info("editFavoriteStatus - Success");
      res.send(makeSuccessFormat());
    }
  } catch (err) {
    next(err);
  }
};

/**
 * [DELETE] 내 비디오 리스트에서 Video 삭제
 *
 * [Request]
 * - videoId
 *
 * [Response]
 * - success만 보내기
 */
export const deleteMyVideo = (req, res, next) => {
  try {
    logger.info("deleteMyVideo - Request");
    const { user, videoId } = req.body;
    if (!videoId) {
      logger.error("addMyVideo - Fail");
      return next(errorCodes["400"]);
    }

    const { uid } = user;
    const isDeleted = db.myVideos.destroy({ where: { uid, videoId } });
    if (isDeleted) {
      logger.info("deleteMyVideo - Success");
      res.send(makeSuccessFormat());
    }
  } catch (err) {
    next(err);
  }
};

/**
 * [POST] 내 비디오 리스트 Video 추가
 * 받아올 데이터: url -> 일단 크롤링. -> talkId -> talkId DB에 있는지 검사. -> 없으면 더 크롤링 -> DB에 저장.
 *
 * 1) Request
 * - tedUrl: (string) TED video url
 *
 * 2) Response
 * - videoId
 * - title
 * - author
 * - thumbnail
 * - duration
 */
export const addMyVideo = async (req, res, next) => {
  try {
    logger.info("addMyVideo - Request");
    const { user, tedUrl } = req.body;
    if (!tedUrl && !config.TED_URL.test(tedUrl)) {
      logger.error("addMyVideo - Fail");
      return next(errorCodes["400"]);
    }

    const params = await getTedHtmlData(tedUrl);
    if (!params) return next(errorCodes["2000"]);

    // talkId 유무 검사
    const { talkId } = params;
    let { videoId } = await db.talkIds.findOne({ where: { talkId } });

    if (videoId === null) {
      const videoUrl = getTedVideoUrl(params);
      if (isEmpty(videoUrl)) return next(errorCodes["2001"]);

      const metaData = getTedMetaData(params);
      const timing = await getTedTiming(params);
      const langMap = compact(await getTedLanguages(params));
      if (isEmpty(langMap)) return next(errorCodes["2002"]);

      // videoId 설정
      const createdVideo = await db.videos.create({
        talkId,
        timing,
        ...videoUrl,
        ...metaData,
      });
      videoId = createdVideo.videoId;

      const tags = getTedTags(params);
      for (const tag of tags) await db.tags.create({ tag, videoId });
      await db.talkIds.create({ talkId, videoId });

      // 언어별 데이터 저장
      const langCodes = langMap.map(l => l.languageCode);
      await Promise.all(
        langCodes.map(langCode => {
          const tableName = `lang${langCode.replace("-", "").toUpperCase()}`;
          const { title, description, author, script } = langMap.find(l => l.languageCode === langCode);
          return db[tableName].create({ videoId, title, description, author, script });
        }),
      );
    }

    // MyVideos에 Insert
    const { uid } = user;
    await db.myVideos.create({ uid, videoId });

    res.send(makeSuccessFormat());
  } catch (err) {
    next(err);
  }
};
