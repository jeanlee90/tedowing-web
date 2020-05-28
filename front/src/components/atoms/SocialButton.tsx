import React from "react";
import { styled, ThemedProps } from "styles/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

export enum Sns {
  google = "Google",
  facebook = "Facebook",
}

interface TProps {
  sns?: Sns;
}

type TStyled = ThemedProps<TProps>;

function SocialButton({ sns }: TProps) {
  return (
    <SButton>
      <SIcon sns={sns}>
        <FontAwesomeIcon icon={sns === Sns.google ? faGoogle : faFacebook} />
      </SIcon>
      <SText>Sign up with {sns}</SText>
    </SButton>
  );
}

const SButton = styled.div.attrs(() => ({ role: "button" }))`
  display: flex;
  width: 100%;
  padding: 12px 14px;
  background-color: ${({ theme }: TStyled) => theme.colors.white};
  border-radius: 3px;
  border: 1px solid #f1f1f1;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease 0s;

  &:hover {
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const SIcon = styled.div`
  padding-right: 8px;
  color: ${({ sns, theme }: TStyled) => (sns === Sns.google ? theme.colors.google : theme.colors.facebook)};
`;

const SText = styled.div`
  flex: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.blackText};
  font-size: ${({ theme }: TStyled) => theme.fontSizes.text};
`;

export default SocialButton;
