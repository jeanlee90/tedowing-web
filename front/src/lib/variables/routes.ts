import * as pages from "pages";

interface TRoute {
  path: string;
  exact?: boolean;
  authority?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>;
}

export const HOME: TRoute = {
  path: "/",
  exact: true,
  component: pages.Home,
};

export const MY_VIDEOS: TRoute = {
  path: "/videos/my",
  exact: true,
  authority: true,
  component: pages.MyVideos,
};
