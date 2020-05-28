import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styles/theme-components";
import Logo from "components/atoms/Logo";
import * as routes from "lib/variables/routes";
import Modal from "components/atoms/Modal";
import Button, { Sizes } from "components/atoms/Button";
import SocialButton, { Sns } from "components/atoms/SocialButton";

interface TProps {
  isLoggedIn: boolean;
}

function HomeTitleButton({ isLoggedIn }: TProps) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    if (isLoggedIn) return history.push(routes.MY_VIDEOS.path);
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <HomeTBWrapper>
      <HomeTitle>
        <HomeTitleSub>Learn English with TED talks</HomeTitleSub>
        <Logo inverted />
      </HomeTitle>
      <Button primary size={Sizes.large} onClick={handleClick}>
        Create a FREE account
      </Button>

      <Modal
        visible={visible}
        title={
          <div>
            Create your
            <br />
            Tedowing account
          </div>
        }
        onClose={handleClose}
      >
        <a href="/api/auth/google">
          <SocialButton sns={Sns.google} />
        </a>
      </Modal>
    </HomeTBWrapper>
  );
}

const HomeTBWrapper = styled.div`
  position: absolute;
  top: calc(50% - 150px);
  left: 25%;

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
