import React from "react";
import { styled, ThemedProps } from "styles/theme";

export enum Types {
  primary = "primary",
  secondary = "secondary",
  warning = "warning",
  inverted = "inverted",
}

interface TProps {
  level?: number;
  type?: Types;
  mark?: boolean;
  underline?: boolean;
  children: React.ReactNode;
}

type TStyled = ThemedProps<TProps>;

function Title({ level, children, ...rest }: TProps) {
  let childCmp = children;
  if (level === 1) childCmp = <Sh1>{children}</Sh1>;
  else if (level === 2) childCmp = <Sh2>{children}</Sh2>;
  else if (level === 3) childCmp = <Sh3>{children}</Sh3>;
  else if (level === 4) childCmp = <Sh4>{children}</Sh4>;
  else if (rest.mark) childCmp = <mark>{children}</mark>;

  return <STitle {...rest}>{childCmp}</STitle>;
}

const STitle = styled.div`
  font-size: ${({ theme }: TStyled) => theme.fontSizes.title};
  line-height: 1.5;

  // type
  color: ${({ type, mark, theme }: TStyled) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.warning) return theme.colors.warning;
    if (type === Types.secondary) return theme.colors.secondaryText;
    if (type === Types.inverted || mark) return theme.colors.white;
    return theme.colors.text;
  }};

  // underline
  text-decoration: ${(props: TProps) => (props.underline ? "underline" : "none")};
`;

const Sh1 = styled.h1`
  font-size: ${({ theme }: TStyled) => theme.fontSizes.h1};
`;

const Sh2 = styled.h2`
  font-size: ${({ theme }: TStyled) => theme.fontSizes.h2};
`;

const Sh3 = styled.h3`
  font-size: ${({ theme }: TStyled) => theme.fontSizes.h3};
`;

const Sh4 = styled.h4`
  font-size: ${({ theme }: TStyled) => theme.fontSizes.h4};
`;

export default Title;
