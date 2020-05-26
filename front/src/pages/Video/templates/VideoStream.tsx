import React, { useEffect, useRef } from "react";
import styled from "styles/theme-components";
import Player from "components/atoms/Player";
import { isMobile } from "lib/utils/device";
import { TVideo } from "stores/videoStore";

type TProps = Pick<TVideo, "width" | "height" | "videoMedium" | "videoHigh" | "thumbnail">;

function VideoStream({ videoMedium, videoHigh, thumbnail }: TProps) {
  const mobile = isMobile();
  const videoUrl = mobile ? videoMedium : videoHigh;
  const streamRef = useRef<HTMLDivElement>(null);

  return (
    <SVideoStream ref={streamRef}>
      {videoUrl && (
        <Player
          controls
          poster={thumbnail}
          sources={[
            {
              src: videoUrl,
              type: "video/mp4",
            },
          ]}
        />
      )}
    </SVideoStream>
  );
}

const SVideoStream = styled.div`
  width: 100%;
  height: 100%;

  > .c-player {
    width: 100%;
    height: 100%;

    > .video-js {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
  }
`;

export default VideoStream;
