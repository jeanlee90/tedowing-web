import React, { useEffect, useCallback } from "react";
import { useStore } from "stores";
import { observer } from "mobx-react-lite";
import { isMobile } from "lib/utils/device";
import styled from "styles/theme-components";
import useRouter from "lib/hooks/useRouter";
import * as routes from "lib/variables/routes";
import Layout from "components/molecules/Layout";
import PcHeader from "components/molecules/PcHeader";
import MobileHeader from "components/molecules/MobileHeader";
import PcNavigation from "components/molecules/PcNavigation";
import MobileNavigation from "components/molecules/MobileNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream, faHistory } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { useRouteMatch } from "react-router-dom";

interface TProps {
  children: React.ReactNode;
}

export interface TMenu {
  text: string;
  link: string;
  icon: React.ReactNode;
}

const menu: TMenu[] = [
  { text: "My Videos", link: routes.MY_VIDEOS.path, icon: <FontAwesomeIcon icon={faStream} /> },
  { text: "Recents", link: "/recents/my", icon: <FontAwesomeIcon icon={faHistory} /> },
  { text: "Contact Support", link: "/support", icon: <FontAwesomeIcon icon={faQuestionCircle} /> },
];

function AppContainer({ children }: TProps) {
  // 첫 페이지 로드 시에만 로그인 체크
  const router = useRouter();
  const { loginStore } = useStore();
  const { email } = loginStore.getUserInfo();

  const getMainPath = (path: string) => {
    const pathArr = path.split("/");
    return pathArr[1] + (pathArr[2] || "");
  };
  const checkAuth = useCallback(async () => {
    const isLoggedIn = await loginStore.checkLogin();
    const { authority } = Object.values(routes).find(r => getMainPath(r.path) === getMainPath(router.pathname)) || {};

    // 로그인 회원용 페이지
    if (authority && !isLoggedIn) return router.push(routes.HOME.path);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await loginStore.logout();
    window.location.href = window.location.origin;
  };

  // Components by device
  const mobile = isMobile();
  const header = mobile ? <MobileHeader>test</MobileHeader> : <PcHeader email={email} onLogout={handleLogout} />;
  const navigation = mobile ? <MobileNavigation menu={menu} /> : <PcNavigation menu={menu} />;

  // Main, Video page
  const { match } = router;
  const { HOME, VIDEO } = routes;
  const isMainPage = match(HOME.path);
  const isVideoPage = match(VIDEO.path);
  if (isMainPage?.isExact || isVideoPage?.isExact) return <div>{children}</div>;

  return (
    <Layout header={header} mobile={mobile} navigation={navigation}>
      <Content>{children}</Content>
    </Layout>
  );
}

const Content = styled.div`
  padding: 24px;
  margin-top: ${({ theme }) => theme.layoutSizes.header};
  margin-left: ${({ theme }) => theme.layoutSizes.pcNavigation};
`;

export default observer(AppContainer);
