import React, { useEffect } from "react";
import videojs from "video.js";
import styled from "styles/theme-components";

// styles
import "video.js/dist/video-js.css";
import "styles/player.custom.css";

type TChangeFn = (currentTime: number) => void;

type TProps = videojs.PlayerOptions & {
  onChangeTime?: TChangeFn;
};

function Player({ onChangeTime, ...props }: TProps) {
  let player: videojs.Player | null = null;
  let refreshIntervalChange: number = 0;
  const videoNode = React.useRef<HTMLVideoElement>(null);

  const clearIntervalChange = () => {
    if (refreshIntervalChange) {
      clearInterval(refreshIntervalChange);
      refreshIntervalChange = 0;
    }
  };

  useEffect(() => {
    player = videojs(videoNode.current, props).ready(function (this: videojs.Player) {
      this.on("play", function (_player: videojs.Player) {
        const curNode = videoNode.current as HTMLVideoElement;

        if (!refreshIntervalChange && onChangeTime && curNode) {
          refreshIntervalChange = setInterval(() => {
            onChangeTime(curNode?.currentTime);
          }, 1000);
        }
      });

      this.on("pause", function () {
        clearIntervalChange();
      });

      this.on("ended", function () {
        clearIntervalChange();
      });
    });

    return () => {
      if (player) player.dispose();
      if (refreshIntervalChange) clearIntervalChange();
    };
  }, []);

  return (
    <CPlayer className="c-player">
      <div className="c-player__screen" data-vjs-player="true">
        <video ref={videoNode} className="video-js vjs-theme-custom" />
      </div>
    </CPlayer>
  );
}

const CPlayer = styled.div`
  width: 100%;
  height: 100%;

  > .video-js {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
`;

export default Player;
