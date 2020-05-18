import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { onLoginSuccess } from "../routes/users";
import isEmpty from "lodash/isEmpty";
import config from "../utils/config";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = config;

const setupPassport = async passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;

        if (profile?._json?.email) {
          profile.email = profile._json.email;
        } else if (!isEmpty(profile.emails)) {
          const target = profile.emails.find(email => email.verified);
          if (target) profile.email = target.value;
        }

        onLoginSuccess(profile, done);
      },
    ),
  );

  // 전달받은 객체(정보)를 세션에 저장
  passport.serializeUser((user, done) => {
    done(null, user); // deserializeUser로 전달됨.
  });

  // 서버로 들어오는 요청마다 세션 정보가 유효한지 검사.
  passport.deserializeUser((user, done) => {
    done(null, user); // req.user로 저장
  });
};

export default setupPassport;
