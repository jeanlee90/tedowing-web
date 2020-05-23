import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function MyVideos({ children }: TProps) {
  return <SMyVideos>ss{children}</SMyVideos>;
}

const SMyVideos = styled.div`
  color: white;
`;

export default MyVideos;
