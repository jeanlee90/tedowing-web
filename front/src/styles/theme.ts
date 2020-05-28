import baseStyled, { css, CSSProp, ThemedStyledInterface } from "styled-components";

type BackQuoteArgs = string[];
interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  ipad: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
  widescreen: (...args: BackQuoteArgs) => CSSProp | undefined;
}

// responsive
const sizes: { [key: string]: number } = {
  mobile: 320,
  ipad: 768,
  tablet: 991,
  desktop: 1200,
  widescreen: 1600,
};

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  ipad: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
  widescreen: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case "widescreen":
      acc.widescreen = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.widescreen}px) {
            ${args}
          }
        `;
      break;
    case "desktop":
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.widescreen}px) and (min-width: ${sizes.desktop}px) {
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
  success: "#3ea6ff",

  title: "#fff",
  text: "#ebebeb",
  secondaryText: "#a6a6a6",
  disabled: "#bfbfbf",

  blackText: "#333",

  border: "#363636",
  background: "#000",
  secondaryBackground: "#1a1a1a",

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
  videoCaption: "165px",
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
