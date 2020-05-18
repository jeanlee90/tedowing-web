import express from "express";
import passport from "passport";
import session from "express-session";
import models from "./models";
import route from "./routes/index";
import config from "./utils/config";
import setupPassport from "./middlewares/passport";
import { defaultErrorHandler } from "./middlewares/ErrorHandler";

const app = express();
const port = config.PORT || 4000;

app.use(session({ secret: "SECRET_CODE", resave: true, saveUninitialized: false })); // 세션 연결
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
setupPassport(passport);

app.use(express.json());
app.use("/api", route);

app.use(defaultErrorHandler);

models.sequelize.sync();

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
