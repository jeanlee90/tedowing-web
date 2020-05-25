import React from "react";
import styled from "styles/theme-components";
import Button, { Sizes } from "components/atoms/Button";

interface TProps {}

function VideoLanguage({}: TProps) {
  return (
    <SVideoLanguage>
      <LangButton>한국어</LangButton>
      <LangButton>English</LangButton>
    </SVideoLanguage>
  );
}

const SVideoLanguage = styled.div`
  padding: 8px 12px;
`;

const LangButton = styled.div.attrs(() => ({ role: "button" }))`
  display: inline-block;
  padding: 4px;
  margin-right: 8px;
`;

export default VideoLanguage;
