import { createGlobalStyle } from "styled-components";
import theme from "styles/theme";
import reset from "styled-reset";

const { colors, fontSizes } = theme;

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
      font-family:  -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Roboto, "맑은 고딕", Malgun Gothic, "돋움", dotum, sans-serif;
      font-size: ${fontSizes.text};
      line-height: 1.3;
      background-color: ${colors.background};
      color: ${colors.text};
    }
    a {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
    }
    input, button {
      outline: none;
      background-color: transparent;
      font-family:  -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Roboto, "맑은 고딕", Malgun Gothic, "돋움", dotum, sans-serif;
      -webkit-appearance: none;
    }
    ol, ul, li {
      list-style: none;
    }
    img {
      display: block;
      border: none;
      outline: none;
    }
    mark {
      background-color: ${colors.primary};
      color: inherit;
    }
    [role="button"] {
      cursor: pointer;
    }
`;

export default GlobalStyle;
