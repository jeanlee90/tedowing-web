import express from "express";
import * as UserRouter from "./users";
import * as MyVideoRouter from "./myVideos";

const router = express.Router();
const checkAlreadyLoggedIn = (req, res, next) => (!req.isAuthenticated() ? next() : res.status(301).redirect("/api/videos/my"));
const authenticateUser = (req, res, next) => (req.isAuthenticated() ? next() : res.status(301).redirect("/"));

router.route("/videos/main").get(function (req, res) {
  res.send(`Main - isLogin ? ${req.isAuthenticated()} ${JSON.stringify(req.user)} ${req.user?.uid}`);
});

// auth
router.route("/auth/google").get([checkAlreadyLoggedIn, UserRouter.requestLoginByGoogle()]);
router.route("/auth/google/callback").get(UserRouter.loginByGoogle());
router.route("/auth/logout").get(UserRouter.logout);

// user
router.route("/users/:uid").put([authenticateUser, UserRouter.editLanguage]);

// myVideos
router
  .route("/videos/my")
  .get([authenticateUser, MyVideoRouter.getMyVideos])
  .post([authenticateUser, MyVideoRouter.addMyVideo]);

router
  .route("/videos/my/:videoId")
  .put([authenticateUser, MyVideoRouter.editFavoriteStatus])
  .delete([authenticateUser, MyVideoRouter.deleteMyVideo]);

module.exports = router;
