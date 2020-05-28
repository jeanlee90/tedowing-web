import passport from "passport";
import db from "../models";
import config from "../lib/variables/config";
import logger from "../lib/utils/logger";
import errorCodes from "../lib/variables/errorCodes";
import languageCodes from "../lib/variables/_langCodes";
import { makeSuccessFormat } from "../lib/utils/makeRespFormat";

const { GOOGLE_SCOPE } = config;

export const requestLoginByGoogle = () => passport.authenticate("google", { scope: GOOGLE_SCOPE });

export const loginByGoogle = () =>
  passport.authenticate("google", { successRedirect: `${config.BASE_URL}/videos/my`, failureRedirect: "/" });

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

export const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

/**
 * [GET] 로그인 정보 가져오기
 * 1) Request
 * - language: (string) 언어코드
 *
 * 2) Response
 * - success
 */
export const getMyLoginInformation = async (req, res, next) => {
  try {
    logger.info("getMyLoginInformation");

    const isLoggedIn = req.isAuthenticated();
    const result = { isLoggedIn, info: {} };
    if (isLoggedIn) {
      const { uid, email, language } = req.user || {};
      result.info = { uid, email, language };
    }

    res.send(makeSuccessFormat(result));
  } catch (err) {
    next(err);
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
    logger.info("editLanguage - Request");
    const { language } = req.body;
    if (!language || !languageCodes[language]) {
      return next(errorCodes["400"]);
    }

    const { uid } = req.user;
    const isUpdated = await db.users.update({ language }, { where: { uid } });
    if (isUpdated) {
      logger.info("editLanguage - Success");
      res.send(makeSuccessFormat());
    }
  } catch (err) {
    next(err);
  }
};
