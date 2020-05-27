import React, { useEffect } from "react";
import { useStore } from "stores";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import useRouter from "lib/hooks/useRouter";
import { useObserver } from "mobx-react-lite";
import VideoLayout from "./templates/VideoLayout";
import VideoScript from "./templates/VideoScript";
import VideoCaption from "./templates/VideoCaption";
import Player from "components/atoms/Player";

function VideoContainer() {
  const { videoStore: store } = useStore();
  const { query } = useRouter();
  const { videoId } = query;
  const themeClass = "theme-bk";
  const videoNode = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const info = store.getInfo();
    if (isEmpty(info) || info.videoId != videoId) store.getVideo(videoId);

    // theme - black
    document.body.classList.add(themeClass);
    return () => document.body.classList.remove(themeClass);
  }, []);

  const handleChangeTime = (time: number) => {
    if (!videoNode.current || time === undefined) return;

    const curNode = videoNode.current;
    if (curNode.paused) curNode.play();
    curNode.currentTime = time;
  };

  return useObserver(() => {
    const info = store.getInfo();
    const { title, description, author, authorPhoto, script, videoMedium, thumbnail } = info;
    const scriptProps = { title, description, author, authorPhoto, script };

    return (
      <VideoLayout
        stream={
          videoMedium && (
            <Player
              controls
              poster={thumbnail}
              sources={[
                {
                  src: videoMedium,
                  type: "video/mp4",
                },
              ]}
              ref={videoNode}
              onAfterChangeTime={store.setCurrentCaption}
            />
          )
        }
        script={<VideoScript {...scriptProps} currentTime={store.currentCaptionTime} onClickScript={handleChangeTime} />}
        caption={<VideoCaption caption={script[store.currentCaptionTime]} />}
      />
    );
  });
}

export default VideoContainer;
