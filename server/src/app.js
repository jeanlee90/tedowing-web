import cors from "cors";
import path from "path";
import express from "express";
import passport from "passport";
import session from "express-session";
import models from "./models";
import apiRouter from "./routes";
import config from "./lib/variables/config";
import setupPassport from "./middlewares/passport";
import { defaultErrorHandler } from "./middlewares/ErrorHandler";
import logger from "./lib/utils/logger";

const app = express();
const port = config.PORT || 4000;
const router = express.Router();
const corsOptions = { origin: true, credentials: true };

app.use(cors(corsOptions));

// static file
app.use(express.static(path.join(__dirname, "../../front/build")));

// session
app.use(session({ secret: "SECRET_CODE", resave: true, saveUninitialized: false }));
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
setupPassport(passport);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api", apiRouter(router));
app.get("*", (req, res) => res.sendFile("index.html", { root: path.join(__dirname, "../../front/build/") }));

// error
app.use(defaultErrorHandler);

models.sequelize.sync();

app.listen(port, () => {
  logger.info(`express is running on ${port}`);
});
