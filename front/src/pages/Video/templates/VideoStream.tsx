import React, { useRef } from "react";
import styled from "styles/theme-components";
import { isMobile } from "lib/utils/device";
import { TVideo } from "stores/videoStore";

const { Player, ControlBar } = require("video-react"); // @types 가 없는 모듈

type TProps = Pick<TVideo, "width" | "height" | "videoMedium" | "videoHigh" | "thumbnail">;

function VideoStream({ width, height, videoMedium, videoHigh, thumbnail }: TProps) {
  const mobile = isMobile();
  const videoUrl = mobile ? videoMedium : videoHigh;
  const streamRef = useRef<HTMLDivElement>(null);

  return (
    <SVideoStream ref={streamRef}>
      <Player fluid={false} width="100%" height="100%" poster={thumbnail} src={videoUrl} />
    </SVideoStream>
  );
}

const SVideoStream = styled.div`
  padding: 0 32px;
  height: 100%;

  video {
    outline: 0;
  }
`;

export default VideoStream;
