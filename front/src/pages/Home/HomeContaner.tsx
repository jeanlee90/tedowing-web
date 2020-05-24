import React from "react";
import { useStore } from "stores";
import { observer } from "mobx-react-lite";
import styled from "styles/theme-components";
import HomeBackground from "./templates/HomeBackground";
import HomeTitleButton from "./templates/HomeTitleButton";

function HomeContainer() {
  const { loginStore } = useStore();
  const { isLoggedIn } = loginStore;

  return (
    <SHome>
      <HomeBackground>
        <HomeTitleButton isLoggedIn={isLoggedIn} />
      </HomeBackground>
    </SHome>
  );
}

const SHome = styled.div`
  position: relative;
`;

export default observer(HomeContainer);
