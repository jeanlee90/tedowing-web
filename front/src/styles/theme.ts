import baseStyled, { css, CSSProp, ThemedStyledInterface } from "styled-components";

type BackQuoteArgs = string[];
interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
}

// responsive
const sizes: { [key: string]: number } = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
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
    case "mobile":
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
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

  border: "#d9d9d9",
  background: "#f5f5f5",

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

const theme = {
  media,
  colors,
  fontSizes,
};

export type Theme = typeof theme;
export type ThemedProps<T> = T & { theme: Theme };
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
