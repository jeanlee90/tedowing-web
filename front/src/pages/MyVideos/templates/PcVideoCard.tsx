import React from "react";
import { Link } from "react-router-dom";
import styled from "styles/theme-components";
import { TMyVideo } from "stores/myVideosStore";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

type TProps = Partial<TMyVideo>;

function PcVideoCard({ videoId, title, author, thumbnail, duration, isFavorite }: TProps) {
  const arrDur = (duration || "").slice(0, -1).split("M");

  return (
    <VideoCard>
      <Link to={`/videos/my/${videoId}`}>
        <VideoThumb thumbnail={thumbnail} />
        <VideoInfo>
          <VideoTitle>{title}</VideoTitle>
          <VideoAuthor>{author}</VideoAuthor>
          {duration && (
            <VideoDuration>
              {("0" + arrDur[0]).slice(-2)}:{("0" + arrDur[1]).slice(-2)}
            </VideoDuration>
          )}
          <VideoFavorite>
            <FontAwesomeIcon icon={isFavorite ? faSolidHeart : faHeart} />
          </VideoFavorite>
        </VideoInfo>
      </Link>
    </VideoCard>
  );
}

const VideoCard = styled.div`
  display: inline-block;
  margin: 1%;
  border-radius: 3px;
  overflow: hidden;

  ${({ theme }) => theme.media.widescreen(` width: 23%;`)};
  ${({ theme }) => theme.media.desktop(` width: 31%;`)};
  ${({ theme }) => theme.media.tablet(`width: 31%;`)};
  ${({ theme }) => theme.media.ipad(`width: 48%;`)};
  ${({ theme }) => theme.media.mobile(`width: 100%;`)};

  // animation
  transition-duration: 0.2s;
  perspective: 1000px;
  transform-origin: center bottom 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
  &:hover {
    transform: matrix(1.05, 0, 0, 1.05, 0, 0);
  }
`;

const VideoThumb = styled.div<TProps>`
  padding-bottom: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${props => props.thumbnail});
`;

const VideoInfo = styled.div`
  padding: 12px 12px 16px 12px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const VideoTitle = styled.div`
  font-weight: 700;
  line-height: 1.4;
  height: 39px;
  margin-bottom: 6px;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
`;

const VideoAuthor = styled.div`
  margin-bottom: 6px;
  font-size: 12px;
`;

const VideoDuration = styled.span`
  padding: 2px 4px;
  font-size: 10px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.background};
`;

const VideoFavorite = styled.span`
  float: right;
  font-size: 15px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default PcVideoCard;
