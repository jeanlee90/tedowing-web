import React from "react";
import { styled, ThemedProps } from "styles/theme";

interface TProps {
  placeholder: string;
  search?: boolean;
  circle?: boolean;
}

type TStyled = ThemedProps<TProps>;

function Input(props: TProps) {
  return <SInput {...props} />;
}

const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: ${({ theme }: TStyled) => theme.fontSizes.text};
  border: ${({ theme }: TStyled) => `1px solid ${theme.colors.border}`};

  &::placeholder {
    color: ${({ theme }: TStyled) => theme.colors.disabled};
  }
  &:placeholder-shown {
    text-overflow: ellipsis;
  }

  // circle
  border-radius: ${({ circle }: TStyled) => (circle ? "30px" : 0)};
  padding: ${({ circle }: TStyled) => (circle ? "6px 14px" : "6px 12px")};
`;

Input.defaultProps = {
  placeholder: "input some text...",
};

export default Input;
