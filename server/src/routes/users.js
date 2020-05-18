import passport from "passport";
import db from "../models";
import config from "../utils/config";
import logger from "../utils/logger";

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
