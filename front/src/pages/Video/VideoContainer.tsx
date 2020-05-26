import React, { useEffect } from "react";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import useRouter from "lib/hooks/useRouter";
import { useStore } from "stores";
import { useObserver } from "mobx-react-lite";
import VideoLayout from "./templates/VideoLayout";
import VideoStream from "./templates/VideoStream";
import VideoScript from "./templates/VideoScript";
import VideoCaption from "./templates/VideoCaption";

function VideoContainer() {
  const { videoStore: store, loginStore } = useStore();
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
    const streamProps = pick(info, ["width", "height", "videoMedium", "videoHigh", "thumbnail"]);
    const scriptProps = pick(info, ["title", "description", "author", "authorPhoto", "script", "timing"]);

    return (
      <VideoLayout
        stream={<VideoStream {...streamProps} />}
        script={<VideoScript {...scriptProps} />}
        caption={<VideoCaption />}
      />
    );
  });
}

export default VideoContainer;
