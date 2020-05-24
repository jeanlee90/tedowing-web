import React, { useEffect } from "react";
import styled from "styles/theme-components";
import { isMobile } from "lib/utils/device";
import { useLocalStore, useObserver } from "mobx-react-lite";
import MyVideosTop from "./templates/MyVideosTop";
import PcVideoCard from "./templates/PcVideoCard";
import NewVideoButton from "./templates/NewVideoButton";
import myVideosStore, { TMyVideosStore } from "./myVideosStore";
import VideoCardList from "./templates/VideoCardList";
import useRouter from "lib/hooks/useRouter";

function MyVideosContainer() {
  const router = useRouter();
  const store: TMyVideosStore = useLocalStore(myVideosStore);
  const VideoCard = isMobile() ? PcVideoCard : PcVideoCard;

  useEffect(() => {
    const { action } = router.history;
    console.log(store.pagination, action);
    if (store.list.length === 0 || action === "PUSH") store.getMyVideos();
  }, []);

  return useObserver(() => (
    <SMyVideos>
      <MyVideosTop>
        <NewVideoButton />
      </MyVideosTop>
      <VideoCardList>
        {store.list.map(video => (
          <VideoCard {...video} key={video.videoId} />
        ))}
      </VideoCardList>
    </SMyVideos>
  ));
}

const SMyVideos = styled.div`
  /* color: ; */
`;

export default MyVideosContainer;
