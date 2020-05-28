import React from "react";
import styled from "styles/theme-components";
import { TVideo } from "stores/videoStore";
import useRouter from "lib/hooks/useRouter";
import Player, { TChangeCurrentTimeFn } from "components/atoms/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type TProps = Pick<TVideo, "thumbnail" | "videoMedium"> & {
  onAfterChangeTime: TChangeCurrentTimeFn;
  videoNode: React.RefAttributes<HTMLVideoElement>["ref"];
};

function VideoStream({ thumbnail, videoMedium, videoNode, onAfterChangeTime }: TProps) {
  const { history } = useRouter();

  return (
    <PlayerWrapper>
      <BackButtonWrapper className="btn-back">
        <BackButton onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
      </BackButtonWrapper>
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
        onAfterChangeTime={onAfterChangeTime}
      />
    </PlayerWrapper>
  );
}

const PlayerWrapper = styled.div`
  height: 100%;
  position: relative;

  &:hover .btn-back {
    opacity: 1;
  }
`;

const BackButtonWrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  text-align: left;
  background: linear-gradient(180deg, black, transparent);
  z-index: 1;
  transition: all 0.5s ease 0s;
`;

const BackButton = styled.span.attrs(() => ({ role: "button" }))`
  padding-top: 18px;
  padding-left: 32px;
  font-size: 40px;
  position: absolute;
`;

export default VideoStream;
