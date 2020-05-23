import React from "react";
import styled from "styles/theme-components";
import { ThemedProps } from "styles/theme";

export enum Types {
  primary = "primary",
  success = "success",
  warning = "warning",
}

export enum Sizes {
  large = "large",
  small = "small",
}

export enum Layouts {
  horizontal = "horizontal",
  vertical = "vertical",
}

interface TProps {
  type?: Types;
  size?: Sizes;
  layout: Layouts;
  children: React.ReactNode;
}

type TStyled = ThemedProps<TProps>;

function Label({ children, ...rest }: TProps) {
  return <SLabel {...rest}>{children}</SLabel>;
}

Label.defaultProps = {
  layout: Layouts.horizontal,
};

const SLabel = styled.div`
  display: inline-block;
  margin-right: 4px;
  border: 1px solid;
  border-radius: 2px;
  border-color: ${({ theme, type }: TStyled) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.success) return theme.colors.success;
    if (type === Types.warning) return theme.colors.warning;
    return theme.colors.border;
  }};

  background-color: ${({ theme, type }: TStyled) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.success) return theme.colors.success;
    if (type === Types.warning) return theme.colors.warning;
    return theme.colors.background;
  }};

  color: ${({ theme, type }: TStyled) => (!type ? theme.colors.text : theme.colors.white)};

  font-size: ${({ size, theme }: TStyled) => {
    if (size == Sizes.large) return theme.fontSizes.title;
    if (size == Sizes.small) return theme.fontSizes.smaller;
    return theme.fontSizes.text;
  }};

  padding: ${({ size }: TStyled) => {
    if (size == Sizes.large) return "6px 8px";
    if (size == Sizes.small) return "3px 6px";
    return "4px 6px";
  }};
`;

export default Label;
