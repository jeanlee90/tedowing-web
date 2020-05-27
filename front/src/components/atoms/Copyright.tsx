import React from "react";
import styled from "styles/theme-components";

function Copyright() {
  return <SCopyright>&copy; Jean Lee. All right reserved.</SCopyright>;
}

const SCopyright = styled.div`
  padding: 4px 0;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sub};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export default Copyright;
