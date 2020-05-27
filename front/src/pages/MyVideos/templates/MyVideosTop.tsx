import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function MyVideosTop({ children }: TProps) {
  return <SMyVideosTop>{children}</SMyVideosTop>;
}

const SMyVideosTop = styled.div``;

export default MyVideosTop;
