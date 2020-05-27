import React, { useEffect, forwardRef, MutableRefObject } from "react";
import videojs from "video.js";
import styled from "styles/theme-components";

// styles
import "video.js/dist/video-js.css";
import "styles/player.custom.css";

type TChangeFn = (currentTime: number) => void;

type TProps = videojs.PlayerOptions & {
  onAfterChangeTime?: TChangeFn;
};

const Player = forwardRef<HTMLVideoElement, TProps>(({ onAfterChangeTime, ...props }, ref) => {
  let player: videojs.Player | null = null;
  let refreshIntervalChange: number = 0;

  const clearIntervalChange = () => {
    if (refreshIntervalChange) {
      clearInterval(refreshIntervalChange);
      refreshIntervalChange = 0;
    }
  };

  useEffect(() => {
    if (!ref) return;

    const videoRef = ref as MutableRefObject<HTMLVideoElement>;
    player = videojs(videoRef.current, props).ready(function (this: videojs.Player) {
      // set interval
      this.on("play", function (_player: videojs.Player) {
        const curNode = videoRef.current;

        if (!refreshIntervalChange && onAfterChangeTime && curNode) {
          refreshIntervalChange = setInterval(() => {
            onAfterChangeTime(curNode.currentTime);
          }, 1000);
        }
      });

      // clear interval
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
        <video ref={ref} className="video-js vjs-theme-custom" />
      </div>
    </CPlayer>
  );
});

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
