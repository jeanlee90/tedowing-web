import React, { useEffect } from "react";
import { useStore } from "stores";
import isEmpty from "lodash/isEmpty";
import useRouter from "lib/hooks/useRouter";
import { useObserver } from "mobx-react-lite";
import { TLangSwitch } from "stores/videoStore";
import VideoLayout from "./templates/VideoLayout";
import VideoScript from "./templates/VideoScript";
import VideoCaption from "./templates/VideoCaption";
import VideoLanguage from "./templates/VideoLanguage";
import Player from "components/atoms/Player";

export type TToggleLang = (lang: keyof TLangSwitch) => void;

function VideoContainer() {
  const { videoStore: store, loginStore } = useStore();
  const { language: userLang } = loginStore.getUserInfo();
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

  const handleToggleLang: TToggleLang = lang => store.toggleLanguage(lang);

  return useObserver(() => {
    const info = store.getInfo();
    const langSwitch = store.getLangSwitch();
    const { title, description, author, authorPhoto, script, videoMedium, thumbnail } = info;
    const languageProps = { langs: langSwitch, userLang, onToggle: handleToggleLang };
    const captionProps = { langSwitch, caption: script[store.currentCaptionTime] };
    const scriptProps = {
      title,
      description,
      author,
      authorPhoto,
      script,
      langSwitch,
      currentTime: store.currentCaptionTime,
      onClickScript: handleChangeTime,
      language: <VideoLanguage {...languageProps} />,
    };

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
        script={<VideoScript {...scriptProps} />}
        caption={<VideoCaption {...captionProps} />}
      />
    );
  });
}

export default VideoContainer;
