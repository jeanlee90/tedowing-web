import React from "react";
import styled from "styles/theme-components";
import { TVideo } from "stores/videoStore";
import Text, { Types } from "components/atoms/Text";
import VideoLanguage from "./VideoLanguage";
import Collapse from "./Collapse";
import Speaker from "./Speaker";

type TProps = Pick<TVideo, "title" | "description" | "author" | "authorPhoto" | "script" | "timing">;

function msToTime(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  return m + ":" + s;
}

function VideoScript({ title, description, author, authorPhoto, script = {}, timing }: TProps) {
  const introTime = (timing?.intro?.end || 0) * 1000;

  return (
    <VideoScriptWrapper>
      <Collapse title={title}>
        <Text type={Types.inverted}>{description}</Text>
        <Speaker photo={authorPhoto} name={author} />
      </Collapse>
      <VideoLanguage />
      <ScriptList>
        {Object.values(script).map(({ text, trans, time }) => (
          <ScriptCard key={time}>
            <ScriptCardTime>{msToTime(time + introTime)}</ScriptCardTime>
            <ScriptCardTextWrapper>
              {text && <ScriptCardText>{text}</ScriptCardText>}
              {trans && <ScriptCardText>{trans}</ScriptCardText>}
            </ScriptCardTextWrapper>
          </ScriptCard>
        ))}
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

  > *:nth-child(2n + 1) {
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

const ScriptCard = styled.div.attrs(() => ({ role: "button" }))`
  display: flex;
  padding: 10px 12px;

  &:hover {
    opacity: 0.85;
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
