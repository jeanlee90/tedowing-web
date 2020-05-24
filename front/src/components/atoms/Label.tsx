import React from "react";
import styled from "styles/theme-components";

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
  strong?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function Label({ children, icon, ...rest }: TProps) {
  return (
    <SLabel {...rest}>
      {icon && <SLabelIcon {...rest}>{icon}</SLabelIcon>}
      {children}
    </SLabel>
  );
}

Label.defaultProps = {
  layout: Layouts.horizontal,
};

const SLabel = styled.div<TProps>`
  display: inline-block;
  margin-right: 4px;
  border: 1px solid;
  border-radius: 2px;
  border-color: ${({ theme, type }) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.success) return theme.colors.success;
    if (type === Types.warning) return theme.colors.warning;
    return theme.colors.border;
  }};

  background-color: ${({ theme, type }) => {
    if (type === Types.primary) return theme.colors.primary;
    if (type === Types.success) return theme.colors.success;
    if (type === Types.warning) return theme.colors.warning;
    return theme.colors.background;
  }};

  color: ${({ theme, type }) => (!type ? theme.colors.text : theme.colors.white)};

  font-size: ${({ size, theme }) => {
    if (size == Sizes.large) return theme.fontSizes.title;
    if (size == Sizes.small) return theme.fontSizes.smaller;
    return theme.fontSizes.text;
  }};

  font-weight: ${({ strong }) => (strong ? 700 : 400)};

  padding: ${({ size }) => {
    if (size == Sizes.large) return "6px 8px";
    if (size == Sizes.small) return "2px 4px";
    return "4px 6px";
  }};

  text-align: ${({ layout }) => (layout === Layouts.vertical ? "center;" : "left")};
`;

const SLabelIcon = styled.div<TProps>`
  display: ${({ layout }) => (layout === Layouts.vertical ? "block;" : "inline-block")};
  margin-right: 8px;
`;

export default Label;
