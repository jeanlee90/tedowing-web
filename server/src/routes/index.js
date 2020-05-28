import * as UserRouter from "./users";
import * as VideoRouter from "./videos";
import * as MyVideoRouter from "./myVideos";
import config from "../lib/variables/config";

const authenticateUser = (req, res, next) => (req.isAuthenticated() ? next() : res.status(301).redirect("/"));
const checkAlreadyLoggedIn = (req, res, next) =>
  !req.isAuthenticated() ? next() : res.status(301).redirect(`${config.BASE_URL}/videos/my`);

const apiRouter = router => {
  router.route("/videos/main").get(function (req, res) {
    res.send(`Main - isLogin ? ${req.isAuthenticated()} ${JSON.stringify(req.user)} ${req.user?.uid}`);
  });

  // auth
  router.route("/auth/google").get([checkAlreadyLoggedIn, UserRouter.requestLoginByGoogle()]);
  router.route("/auth/google/callback").get(UserRouter.loginByGoogle());
  router.route("/auth/logout").get(UserRouter.logout);

  // user
  router.route("/users/my").get(UserRouter.getMyLoginInformation).put([authenticateUser, UserRouter.editLanguage]);

  // myVideos
  router
    .route("/videos/my")
    .get([authenticateUser, MyVideoRouter.getMyVideos])
    .post([authenticateUser, MyVideoRouter.addMyVideo]);

  router
    .route("/videos/my/:videoId")
    .put([authenticateUser, MyVideoRouter.editFavoriteStatus])
    .delete([authenticateUser, MyVideoRouter.deleteMyVideo]);

  // videos
  router.route("/videos/:videoId").get(VideoRouter.getVideo);

  // Drop All Unknown API URI requests
  router.route("*").all((req, res, next) => res.sendStatus(404));

  return router;
};

export default apiRouter;
