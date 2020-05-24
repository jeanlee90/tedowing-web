import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function VideoCardList({ children }: TProps) {
  return <SVideoCardList>{children}</SVideoCardList>;
}

const SVideoCardList = styled.div`
  padding-top: 24px;
`;

export default VideoCardList;
