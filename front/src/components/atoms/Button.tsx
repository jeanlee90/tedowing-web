import React, { useState } from "react";
import { styled, ThemedProps } from "styles/theme";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum Sizes {
  large = "large",
  small = "small",
}

interface TProps {
  size?: Sizes;
  border?: boolean;
  primary?: boolean;
  block?: boolean;
  disabled?: boolean;
  circle?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

type TStyled = ThemedProps<TProps>;

function SIcon({ children, icon, loading, ...rest }: TProps) {
  const fIcon = icon || <FontAwesomeIcon icon={faSpinner} spin />;

  return (
    <SIconButtonWrapper>
      <SIconButtonIcon {...rest}>{fIcon}</SIconButtonIcon>
      <SIconButtonText>{loading ? "Loading" : children}</SIconButtonText>
    </SIconButtonWrapper>
  );
}

function Button({ className, children, loading, icon, ...rest }: TProps) {
  const [clicked, setClicked] = useState(false);

  return (
    <SButton
      {...rest}
      className={`${className}${clicked ? "clicked" : ""}`}
      onMouseUp={() => setClicked(false)}
      onMouseDown={() => setClicked(true)}
    >
      {!!icon || loading ? (
        <SIcon icon={icon} loading={loading} {...rest}>
          {children}
        </SIcon>
      ) : (
        children
      )}
    </SButton>
  );
}

const SIconButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
`;

const SButton = styled.div.attrs(() => ({ role: "button" }))`
  margin: 0 3px 3px 0;
  border-width: 1px;
  border-style: solid;
  transition: all 0.1s ease 0s;
  text-align: center;
  user-select: none; // drag
  display: ${({ block }: TStyled) => (block ? "block" : "inline-block")};
  border-radius: ${({ circle }: TStyled) => (circle ? "30px" : "3px")};

  // size
  font-size: ${({ theme, size }: TStyled) => {
    if (size === Sizes.small) return theme.fontSizes.sub;
    return theme.fontSizes.text;
  }};
  padding: ${({ size }: TStyled) => {
    if (size === Sizes.large) return "12px 16px";
    if (size === Sizes.small) return "4px 6px";
    return "10px 12px";
  }};

  border-color: ${({ primary, theme }: TStyled) => (primary ? theme.colors.primary : theme.colors.border)};
  pointer-events: ${(props: TStyled) => (props.disabled ? "none" : "initial")};
  background-color: ${({ theme, ...props }: TStyled) => {
    if (props.primary && !props.border) return theme.colors.primary;
    if (props.disabled) return theme.colors.background;
    return theme.colors.white;
  }};

  // text color (:disabled, primary, border)
  color: ${({ theme, ...props }: TStyled) => {
    if (!props.primary && props.disabled) return theme.colors.disabled;
    if (props.primary && props.border) return theme.colors.primary;
    if (props.primary) return theme.colors.white;
    return theme.colors.text;
  }};
  opacity: ${({ disabled }: TStyled) => (disabled ? "0.7" : "1")};

  // animation
  transition-duration: 0.2s;
  perspective: 1000px;
  transform-origin: center bottom 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
  &.clicked {
    transform: matrix(0.95, 0, 0, 0.95, 0, 0);
  }
`;

const SIconButtonIcon = styled.div`
  padding-right: ${({ size }: TStyled) => (size === Sizes.large ? "12px" : "8px")};
  font-size: ${({ size, theme }: TStyled) => {
    if (size === Sizes.large) return theme.fontSizes.title;
    if (size === Sizes.small) return theme.fontSizes.sub;
    return theme.fontSizes.text;
  }};
`;

const SIconButtonText = styled.div`
  flex: 1;
`;

Button.defaultProps = {
  className: "",
};

export default Button;
