import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function MobileHeader({ children }: TProps) {
  return <SMobileHeader>MHeader {children}</SMobileHeader>;
}

const SMobileHeader = styled.div`
  font-weight: 700;
`;

export default MobileHeader;
