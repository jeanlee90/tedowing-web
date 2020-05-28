import React from "react";
import ReactDOM from "react-dom";
import "mobx-react-lite/batchingForReactDom";
import App from "./App";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "./styles/theme-components";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  document.getElementById("root"),
);
