import React from "react";
import styled from "styles/theme-components";

interface TProps {
  photo: string;
  name: string;
}

function Speaker({ photo, name }: TProps) {
  return (
    <SpeakerWrapper>
      <SpeakerTitle>ABOUT THE SPEAKER</SpeakerTitle>
      <SpeakerCard>
        <SpeakerPhoto>{photo && <img src={photo} alt={name} />}</SpeakerPhoto>
        <SpeakerName>{name}</SpeakerName>
      </SpeakerCard>
    </SpeakerWrapper>
  );
}

const SpeakerWrapper = styled.div`
  padding-top: 12px;
`;

const SpeakerTitle = styled.div`
  display: inline-block;
  margin-top: 12px;
  padding-top: 6px;
  padding-bottom: 12px;
  padding-right: 6px;
  color: ${({ theme }) => theme.colors.disabled};
  border-top: 1px solid ${({ theme }) => theme.colors.white};
`;

const SpeakerCard = styled.div``;

const SpeakerPhoto = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  > img {
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const SpeakerName = styled.div`
  display: inline-block;
  vertical-align: top;
  padding-left: 12px;
  line-height: 1.5;
`;

export default Speaker;
