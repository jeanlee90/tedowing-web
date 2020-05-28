import React, { useEffect } from "react";
import { useStore } from "stores";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import useRouter from "lib/hooks/useRouter";
import { useObserver } from "mobx-react-lite";
import { TLangSwitch } from "stores/videoStore";
import VideoLayout from "./templates/VideoLayout";
import VideoStream from "./templates/VideoStream";
import VideoScript from "./templates/VideoScript";
import VideoCaption from "./templates/VideoCaption";
import VideoLanguage from "./templates/VideoLanguage";

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
    if (isEmpty(info) || info.videoId !== +videoId) store.getVideo(videoId);

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
    if (store.loading || isEmpty(info)) return <div>LOADING</div>;

    const langSwitch = store.getLangSwitch();
    const streamProps = pick(info, ["videoMedium", "thumbnail"]);
    const languageProps = { langs: langSwitch, userLang, onToggle: handleToggleLang };
    const scriptProps = pick(info, ["title", "description", "author", "authorPhoto", "script", "scriptTimes"]);

    return (
      <VideoLayout
        stream={<VideoStream {...streamProps} videoNode={videoNode} onAfterChangeTime={store.setCurrentCaption} />}
        script={
          <VideoScript
            {...scriptProps}
            langSwitch={langSwitch}
            currentTime={store.currentCaptionTime}
            language={<VideoLanguage {...languageProps} />}
            onClickScript={handleChangeTime}
          />
        }
        caption={<VideoCaption langSwitch={langSwitch} caption={info.script?.[store.currentCaptionTime]} />}
      />
    );
  });
}

export default VideoContainer;
