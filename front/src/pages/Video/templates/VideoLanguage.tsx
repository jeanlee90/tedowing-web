import React from "react";
import styled from "styles/theme-components";
import langCodes from "lib/variables/langCodes";
import { TLangSwitch } from "stores/videoStore";
import { TToggleLang } from "../VideoContainer";

interface TProps {
  userLang: string;
  langs: TLangSwitch;
  onToggle: TToggleLang;
}

function VideoLanguage({ langs, userLang, onToggle }: TProps) {
  const makeActive = (active: boolean) => (active ? "active" : "");

  return (
    <SVideoLanguage>
      <LangButton className={makeActive(langs.en)} onClick={() => onToggle("en")}>
        {langCodes.en?.nativeName}
      </LangButton>
      <LangButton className={makeActive(langs.user)} onClick={() => onToggle("user")}>
        {langCodes[userLang]?.nativeName}
      </LangButton>
    </SVideoLanguage>
  );
}

const SVideoLanguage = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LangButton = styled.div.attrs(() => ({ role: "button" }))`
  display: inline-block;
  padding: 3px 4px;
  margin-right: 12px;
  font-size: 11px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export default VideoLanguage;
