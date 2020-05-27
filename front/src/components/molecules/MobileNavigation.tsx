import React from "react";
import styled from "styles/theme-components";
import { TMenu } from "components/organisms/AppContainer";

interface TProps {
  menu: TMenu[];
}

function MobileNavigation({ menu }: TProps) {
  return <SMobileNavigation>MobileNavigation {JSON.stringify(menu)}</SMobileNavigation>;
}

const SMobileNavigation = styled.div``;

export default MobileNavigation;
