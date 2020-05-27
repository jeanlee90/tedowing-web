import React from "react";
import styled from "styles/theme-components";
import { TCaption } from "stores/videoStore";

interface TProps {
  caption: TCaption;
}

function VideoCaption({ caption }: TProps) {
  const { text, trans } = caption;

  return (
    <SVideoCaption>
      {text && <CaptionEn>{text}</CaptionEn>}
      {trans && <CaptionUl>{trans}</CaptionUl>}
    </SVideoCaption>
  );
}

const SVideoCaption = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CaptionEn = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h2};

  & + div {
    padding-top: 8px;
  }
`;

const CaptionUl = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  color: ${({ theme }) => theme.colors.disabled};
`;

VideoCaption.defaultProps = {
  caption: {
    text: "",
    trans: "",
  },
};

export default VideoCaption;
