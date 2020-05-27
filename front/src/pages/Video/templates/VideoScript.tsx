import React, { useEffect, useRef } from "react";
import styled from "styles/theme-components";
import { TVideo, TLangSwitch } from "stores/videoStore";
import Text, { Types } from "components/atoms/Text";
import Collapse from "./Collapse";
import Speaker from "./Speaker";

type TProps = Pick<TVideo, "title" | "description" | "author" | "authorPhoto" | "script"> & {
  currentTime: number;
  langSwitch: TLangSwitch;
  language: React.ReactNode;
  onClickScript: (time: number) => void;
};

function msToTime(duration: number) {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  return m + ":" + s;
}

function VideoScript({
  title,
  description,
  author,
  authorPhoto,
  script,
  language,
  langSwitch,
  currentTime,
  onClickScript,
}: TProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && activeRef.current) {
      const scrollTop = activeRef.current.offsetTop - 94 - scrollRef.current.offsetHeight / 2;
      scrollRef.current.scrollTop = scrollTop < 0 ? 0 : scrollTop;
    }
  }, [currentTime]);

  return (
    <VideoScriptWrapper>
      <Collapse title={title}>
        <Text type={Types.inverted}>{description}</Text>
        <Speaker photo={authorPhoto} name={author} />
      </Collapse>
      {language}
      <ScriptList ref={scrollRef}>
        {Object.keys(script).map(time => {
          const sTime = +time;
          const { text, trans } = script[sTime];
          const isShowEn = langSwitch.en && text;
          const isShowUl = langSwitch.user && trans;
          const isActive = currentTime > 0 && sTime === currentTime;

          return (
            (isShowEn || isShowUl) && (
              <ScriptCard
                key={sTime}
                ref={isActive ? activeRef : null}
                className={isActive ? "active" : ""}
                onClick={() => onClickScript(sTime)}
              >
                <ScriptCardTime>{msToTime(sTime)}</ScriptCardTime>
                <ScriptCardTextWrapper>
                  {isShowEn && <ScriptCardText>{text}</ScriptCardText>}
                  {isShowUl && <ScriptCardText>{trans}</ScriptCardText>}
                </ScriptCardTextWrapper>
              </ScriptCard>
            )
          );
        })}
      </ScriptList>
    </VideoScriptWrapper>
  );
}

const VideoScriptWrapper = styled.div`
  height: 100%;
`;

const ScriptList = styled.div`
  overflow-y: auto;
  height: calc(100% - 94px);
`;

const ScriptCard = styled.div.attrs(() => ({ role: "button" }))`
  display: flex;
  padding: 10px 12px;
  position: relative;

  &:hover {
    opacity: 0.85;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.text};

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ScriptCardTime = styled.div`
  padding-right: 3px;
  width: 50px;
`;

const ScriptCardTextWrapper = styled.div`
  width: calc(100% - 60px);
`;

const ScriptCardText = styled.div`
  line-height: 1.3;

  & + div {
    padding-top: 6px;
  }
`;

export default VideoScript;
