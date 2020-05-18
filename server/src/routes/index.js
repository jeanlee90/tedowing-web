import express from "express";
import { loginByGoogle, requestLoginByGoogle } from "./users";
import { getMyVideos, addMyVideo, deleteMyVideo } from "./myVideos";

const router = express.Router();
const checkAlreadyLoggedIn = (req, res, next) => (!req.isAuthenticated() ? next() : res.status(301).redirect("/"));
const authenticateUser = (req, res, next) => (req.isAuthenticated() ? next() : res.status(301).redirect("/"));

router.route("/videos/main").get(function (req, res) {
  res.send(`Main - isLogin ? ${req.isAuthenticated()}`);
});

// auth
router.route("/auth/google").get([checkAlreadyLoggedIn, requestLoginByGoogle()]);
router.route("/auth/google/callback").get(loginByGoogle());

module.exports = router;
