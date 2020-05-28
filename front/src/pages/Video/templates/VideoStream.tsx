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
      <BackButton className="btn-back" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <Player controls poster={thumbnail} src={videoMedium} ref={videoNode} onAfterChangeTime={onAfterChangeTime} />
    </PlayerWrapper>
  );
}

const PlayerWrapper = styled.div`
  height: 100%;
  position: relative;

  &:hover .btn-back {
    opacity: 1;
    pointer-events: initial;
  }
`;

const BackButton = styled.span.attrs(() => ({ role: "button" }))`
  opacity: 0;
  font-size: 40px;
  position: absolute;
  left: 32px;
  top: 18px;
  z-index: 1;

  transition: all 0.5s ease 0s;
`;

export default VideoStream;
