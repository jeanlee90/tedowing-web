import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import models from "./models";
import route from "./routes/index";
import config from "./lib/variables/config";
import setupPassport from "./middlewares/passport";
import { defaultErrorHandler } from "./middlewares/ErrorHandler";
import logger from "./lib/utils/logger";

const app = express();
const port = config.PORT || 4000;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(session({ secret: "SECRET_CODE", resave: true, saveUninitialized: false }));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
setupPassport(passport);

app.use(express.json());
app.use("/api", route);

app.use(defaultErrorHandler);

models.sequelize.sync();

app.listen(port, () => {
  logger.info(`express is running on ${port}`);
});
