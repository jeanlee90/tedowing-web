import React, { useEffect } from "react";
import styled from "styles/theme-components";
import { useStore } from "stores";

interface TProps {
  children: React.ReactNode;
}

function AppContainer({ children }: TProps) {
  const { loginStore } = useStore();

  // 첫 페이지 로드 시에만 로그인 체크
  useEffect(() => {
    loginStore.checkLogin();
  }, [loginStore]);

  return <SAppContainer>{children}</SAppContainer>;
}

const SAppContainer = styled.div``;

export default AppContainer;
