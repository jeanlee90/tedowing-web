import React from "react";
import { styled, ThemedProps } from "styles/theme";

export enum Types {
  primary = "primary",
  secondary = "secondary",
  warning = "warning",
  inverted = "inverted",
}

interface TProps {
  type?: Types;
  mark?: boolean;
  strong?: boolean;
  underline?: boolean;
  children: React.ReactNode;
}

type TStyled = ThemedProps<TProps>;

function Text({ children, ...rest }: TProps) {
  return (
    <SText as={rest.mark ? "mark" : "div"} {...rest}>
      {children}
    </SText>
  );
}

const SText = styled.div`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.text};
  line-height: 1.5;

  // type
  color: ${({ theme, type, mark }: TStyled) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.warning) return theme.colors.warning;
    if (type === Types.secondary) return theme.colors.secondaryText;
    if (type === Types.inverted || mark) return theme.colors.white;
    return theme.colors.text;
  }};

  // underline
  text-decoration: ${({ underline }: TStyled) => (underline ? "underline" : "none")};

  // strong
  font-weight: ${({ strong }: TStyled) => (strong ? 700 : 400)};
`;

export default Text;
