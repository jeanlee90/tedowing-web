import React from "react";
import { Link } from "react-router-dom";
import styled from "styles/theme-components";
import Logo from "components/atoms/Logo";
import Button, { Sizes } from "components/atoms/Button";
import * as routes from "lib/variables/routes";

interface TProps {
  isLoggedIn: boolean;
}

function HomeTitleButton({ isLoggedIn }: TProps) {
  return (
    <HomeTBWrapper>
      <HomeTitle>
        <HomeTitleSub>Learn English with TED talks</HomeTitleSub>
        <Logo inverted />
      </HomeTitle>
      <Link to={isLoggedIn ? "/test" : routes.MY_VIDEOS.path}>
        <Button primary size={Sizes.large}>
          Create a FREE account
        </Button>
      </Link>
    </HomeTBWrapper>
  );
}

const HomeTBWrapper = styled.div`
  position: absolute;
  top: calc(50% - 150px);

  ${({ theme }) => theme.media.desktop(`left: 25%;`)}
  ${({ theme }) => theme.media.tablet(`left: 10%;`)}
  ${({ theme }) => theme.media.mobile(`left: 7%`)}
`;

const HomeTitle = styled.div`
  padding-bottom: 24px;
  color: ${({ theme }) => theme.colors.background};
`;

const HomeTitleSub = styled.div`
  padding-bottom: 2px;
`;

export default HomeTitleButton;
