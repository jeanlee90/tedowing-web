import React from "react";
import styled from "styles/theme-components";

interface TProps {
  width: number;
  inverted?: boolean;
}

function Logo({ inverted, ...rest }: TProps) {
  return (
    <SLogo href="/" {...rest}>
      <img src={`/images/logo${inverted ? "_inverted" : ""}.png`} alt="logo" />
    </SLogo>
  );
}

const SLogo = styled.a`
  display: inline-block;
  width: ${({ width }: TProps) => `${width}px`};

  > img {
    width: 100%;
  }
`;

Logo.defaultProps = {
  width: 200,
};

export default Logo;
