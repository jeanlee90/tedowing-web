import React from "react";
import styled from "styles/theme-components";

interface TProps {
  loading: boolean;
  children: React.ReactNode;
}

function VideoCardList({ loading, children }: TProps) {
  return (
    <SVideoCardList>
      {loading && <Overlay />}
      {children}
    </SVideoCardList>
  );
}

const SVideoCardList = styled.div`
  padding-top: 24px;
  position: relative;
`;

const Overlay = styled.div`
  position: aboslute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(255, 255, 255, 0.7); */
  background-color: rgba(0, 0, 0, 0.7);
`;

export default VideoCardList;
