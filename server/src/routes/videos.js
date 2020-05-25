import compact from "lodash/compact";
import isEmpty from "lodash/isEmpty";
import keyBy from "lodash/keyBy";
import db from "../models";
import logger from "../lib/utils/logger";
import config from "../lib/variables/config";
import errorCodes from "../lib/variables/errorCodes";
import { makeSuccessFormat } from "../lib/utils/makeRespFormat";

/**
 * [GET] 내 비디오 리스트 가져오기
 * 1) Request
 * - videoId: number
 *
 * 2) Response
 * - totalCount: number
 * - totalPage: number
 * - currentPage: number
 * - list: [object]
 *    - videoId
 *    - title
 *    - author
 *    - thumbnail
 *    - duration
 */
export const getVideo = async (req, res, next) => {
  try {
    logger.info("getVideo - Request");
    const { videoId } = req.params;
    if (!videoId) return next(errorCodes[400]);

    const video = await db.videos.findOne({ where: { videoId } });
    if (video === null) return next(errorCodes[2003]);

    // English
    const videoEnLang = await db.langEN.findOne({ where: { videoId } });
    if (videoEnLang === null) return next(errorCodes[2003]);

    let { title, author, description, script } = videoEnLang.dataValues;
    script = keyBy(
      script.paragraphs.reduce((m, p) => [...m, ...p.cues], []),
      o => o.time,
    );

    // user language
    const userLang = req.user?.language;
    if (userLang) {
      const videoUserLang = await db[`lang${userLang.replace("-", "").toUpperCase()}`].findOne({ where: { videoId } });
      if (videoUserLang === null) return next(errorCodes[2003]);

      const userLangInfo = videoUserLang.dataValues;
      userLangInfo.script.paragraphs.forEach(({ cues }) =>
        cues.forEach(({ time, text }) => {
          if (!script[time]) script[time] = { time };
          script[time].trans = text;
        }),
      );
      title = userLangInfo.title;
      author = userLangInfo.author;
      description = userLangInfo.description;
    }

    const result = { ...video.dataValues, title, author, description, script };
    delete result.createdAt;
    delete result.updatedAt;

    logger.info("getVideo - Success");
    res.send(makeSuccessFormat(result));
  } catch (err) {
    next(err);
  }
};
