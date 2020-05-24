import React from "react";
import styled from "styles/theme-components";
import { TMenu } from "components/organisms/AppContainer";

interface TProps {
  menu: TMenu[];
}

function MobileNavigation({}: TProps) {
  return <SMobileNavigation>MobileNavigation</SMobileNavigation>;
}

const SMobileNavigation = styled.div``;

export default MobileNavigation;
