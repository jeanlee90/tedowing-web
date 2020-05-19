import passport from "passport";
import db from "../models";
import config from "../lib/variables/config";
import logger from "../lib/utils/logger";
import errorCodes from "../lib/variables/errorCodes";
import languageCodes from "../lib/variables/_langCodes";
import { makeSuccessFormat } from "../lib/utils/makeRespFormat";

const { GOOGLE_SCOPE } = config;

export const requestLoginByGoogle = () => passport.authenticate("google", { scope: GOOGLE_SCOPE });
export const loginByGoogle = () => passport.authenticate("google", { successRedirect: "/api/videos/main", failureRedirect: "/api/videos/my" });
export const onLoginSuccess = async (profile, done) => {
  const { id: googleId, displayName, accessToken, email } = profile;

  // 이미 가입했는지 검사 후 처리 (findOrCreate 계속 에러나서 따로 처리)
  try {
    const user = await db.users.findOne({ where: { email } });
    if (user) return done(null, user);

    const createdUser = await db.users.create({ email, googleId });
    if (createdUser.uid) await db.googleOauths.create({ uid: createdUser.uid, googleId, email, displayName, accessToken });

    return done(null, createdUser);
  } catch (err) {
    logger.error(err);
  }
};

/**
 * [PUT] 언어 설정
 * 1) Request
 * - language: (string) 언어코드
 *
 * 2) Response
 * - success
 */
export const editLanguage = async (req, res, next) => {
  try {
    logger.info("editFavoriteStatus - Request");
    const { user, language } = req.body;
    if (!language || !languageCodes[language]) {
      logger.error("addMyVideo - Fail");
      return next(errorCodes["400"]);
    }

    const { uid } = user;
    const isUpdated = await db.users.update({ language }, { where: { uid } });
    if (isUpdated) {
      logger.info("editFavoriteStatus - Success");
      res.send(makeSuccessFormat());
    }
  } catch (err) {
    next(err);
  }
};
