import React from "react";
import { styled, ThemedProps } from "styles/theme";

interface TProps {
  placeholder: string;
  search?: boolean;
  circle?: boolean;
}

function Input(props: TProps) {
  return <SInput {...props} />;
}

const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.text};
  border: 1px solid ${({ theme }) => `${theme.colors.border}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.disabled};
  }
  &:placeholder-shown {
    text-overflow: ellipsis;
  }

  // circle
  border-radius: ${({ circle }: TProps) => (circle ? "30px" : 0)};
  padding: ${({ circle }: TProps) => (circle ? "6px 14px" : "6px 12px")};
`;

Input.defaultProps = {
  placeholder: "input some text...",
};

export default Input;
