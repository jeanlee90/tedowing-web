import baseStyled, { css, CSSProp, ThemedStyledInterface } from "styled-components";

type BackQuoteArgs = string[];
interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  ipad: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

// responsive
const sizes: { [key: string]: number } = {
  mobile: 320,
  ipad: 768,
  tablet: 991,
  desktop: 1024,
};

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  ipad: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case "desktop":
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case "tablet":
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case "ipad":
      acc.ipad = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) and (min-width: ${sizes.ipad}px) {
            ${args}
          }
        `;
      break;
    case "mobile":
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.ipad}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

// colors
const colors = {
  white: "#fff",
  black: "#000",

  primary: "#e62b1e",
  primaryLight: "#fc5248",

  warning: "#ffd300",
  success: "#437BFE",

  title: "#333",
  text: "#333",
  secondaryText: "#666",
  disabled: "#bfbfbf",

  border: "#e0e0e0",
  background: "#f0f0f0",

  google: "#ea4335",
  facebook: "#3b5998",
};

// font sizes
const fontSizes = {
  h1: "38px",
  h2: "30px",
  h3: "24px",
  h4: "20px",
  title: "16px",
  text: "13px",
  sub: "12px",
  smaller: "10px",
};

const layoutSizes = {
  header: "54px",
  pcNavigation: "235px",
};

const theme = {
  media,
  colors,
  fontSizes,
  layoutSizes,
};

export type Theme = typeof theme;
export type ThemedProps<T> = T & { theme: Theme };
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
