import { lazy } from "react";

export const Home = require("./Home").default;

// React.lazy
export const MyVideos = lazy(() => import("./MyVideos"));
export const Video = lazy(() => import("./Video"));
