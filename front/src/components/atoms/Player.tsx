import React, { useEffect } from "react";
import videojs from "video.js";

// styles
import "video.js/dist/video-js.css";
import "styles/player.custom.css";

type TProps = videojs.PlayerOptions & {
  onChangeTime?: () => void;
};

function Player(props: TProps) {
  let player: videojs.Player | null = null;
  let videoNode: HTMLVideoElement | null = null;
  let refreshIntervalChange: number = 0;

  useEffect(() => {
    player = videojs(videoNode, props).ready(function (this: videojs.Player) {
      this.on("play", function (_player: videojs.Player) {
        if (!refreshIntervalChange) {
          const curNode = videoNode as HTMLVideoElement;
          refreshIntervalChange = setInterval(() => console.log(curNode.currentTime), 1000);
        }
      });

      this.on("pause", function (_player: videojs.Player) {
        if (refreshIntervalChange) {
          clearInterval(refreshIntervalChange);
          refreshIntervalChange = 0;
        }
      });
    });

    return () => {
      if (player) player.dispose(); // destory video
      if (refreshIntervalChange) clearInterval(refreshIntervalChange);
    };
  }, []);

  return (
    <div className="c-player">
      <div className="c-player__screen" data-vjs-player="true">
        <video ref={(node: HTMLVideoElement) => (videoNode = node)} className="video-js vjs-theme-custom" />
      </div>
    </div>
  );
}

export default Player;
