import React, { useEffect } from "react";
import styled from "styles/theme-components";
import Player from "components/atoms/Player";
import { isMobile } from "lib/utils/device";
import { TVideo } from "stores/videoStore";

type TProps = Pick<TVideo, "width" | "height" | "videoMedium" | "videoHigh" | "thumbnail">;

function VideoStream({ width, height, videoMedium, videoHigh, thumbnail }: TProps) {
  const mobile = isMobile();
  const videoUrl = mobile ? videoMedium : videoHigh;

  return (
    <SVideoStream>
      {videoUrl && (
        <Player
          controls
          fluid={false}
          poster={thumbnail}
          aspectRatio="16:9"
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
  padding: 0 32px;
  height: 100%;

  video {
    outline: 0;
  }
`;

export default VideoStream;
