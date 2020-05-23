import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function HomeBackground({ children }: TProps) {
  return (
    <BgImage>
      {children}
      <BgCopyright>Photo by Avel Chuklanov on Unsplash</BgCopyright>
    </BgImage>
  );
}

const BgImage = styled.div`
  height: 100vh;
  position: relative;
  padding: 24px 48px;
  box-shadow: inset 0 0 0 100vw rgba(0, 0, 0, 0.5);
  background-image: url("/images/main_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 40% 0;

  ${({ theme }) => theme.media.desktop("background-position: center;")};
`;

const BgCopyright = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  color: ${({ theme }) => theme.colors.disabled};
  font-size: ${({ theme }) => theme.fontSizes.sub};

  ${({ theme }) => theme.media.desktop("left: initial; right: 24px;")};
`;

export default HomeBackground;
