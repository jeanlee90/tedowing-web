import db from "../models";
import logger from "../utils/logger";
import errorCodes from "../utils/errorCodes";
import { makeSuccessFormat } from "../utils/makeRespFormat";

/**
 * [GET] 내 비디오 리스트 가져오기
 *
 * [Response]
 * - list: [object]
 *    - videoId
 *    - title
 *    - author
 *    - thumbnail
 *    - duration
 */
export const getMyVideos = async (req, res, next) => {
  logger.info("getMyVideos - Request");

  db.myVideos
    .findAll()
    .then(list => {
      logger.info("getMyVideos - Success");
      res.send(makeSuccessFormat({ list }));
    })
    .catch(err => {
      logger.error("getMyVideos - Fail : " + err);
      next(err);
    });
};

/**
 * [POST] 내 비디오 리스트 Video 추가
 * 받아올 데이터: url -> 일단 크롤링. -> videoId -> videoId로 DB에 있는지 검사. -> 없으면 더 크롤링 -> DB에 저장.
 *
 * [Request]
 * - url: (string) TED video url
 *
 * [Response]
 * - videoId
 * - title
 * - author
 * - thumbnail
 * - duration
 */
export const addMyVideo = async (req, res, next) => {
  logger.info("addMyVideo - Request");

  const { uid, videoId } = req.body;
  if (!uid || !videoId) {
    logger.error("addMyVideo - Fail");
    return next(errorCodes["400"]);
  }

  db.myVideos
    .create({
      uid,
      videoId,
    })
    .then(result => {
      logger.info("addMyVideo - Success");
      res.send(makeSuccessFormat(result));
    })
    .catch(err => {
      logger.error("addMyVideo - Fail");
      next(err);
    });
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
export const deleteMyVideo = async (req, res, next) => {
  logger.info("deleteMyVideo - Request");

  res.send(makeSuccessFormat());
};
