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

  useEffect(() => {
    const info = store.getInfo();
    if (isEmpty(info) || info.videoId != videoId) store.getVideo(videoId);

    // theme - black
    document.body.classList.add(themeClass);
    return () => document.body.classList.remove(themeClass);
  }, []);

  return useObserver(() => {
    const info = store.getInfo();
    const { videoMedium, thumbnail } = info;
    const scriptProps = pick(info, ["title", "description", "author", "authorPhoto", "script"]);

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
              onChangeTime={store.setCurrentCaption}
            />
          )
        }
        script={<VideoScript {...scriptProps} currentTime={store.currentCaptionTime} />}
        caption={<VideoCaption />}
      />
    );
  });
}

export default VideoContainer;
