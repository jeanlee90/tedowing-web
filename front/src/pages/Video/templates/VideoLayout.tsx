import React from "react";
import styled from "styles/theme-components";

interface TProps {
  loading: boolean;
  stream: React.ReactNode;
  script: React.ReactNode;
  caption: React.ReactNode;
}

function VideoLayout({ loading, stream, script, caption }: TProps) {
  return (
    <SVideoLayout>
      <SVideoRow>
        <StreamWrapper>{!loading && stream}</StreamWrapper>
        <ScriptWrapper>{!loading && script}</ScriptWrapper>
      </SVideoRow>
      <CaptionWrapper>{!loading && caption}</CaptionWrapper>
    </SVideoLayout>
  );
}

const SVideoLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${({ theme }) => theme.colors.white};
`;

const SVideoRow = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - ${({ theme }) => theme.layoutSizes.videoCaption});
`;

const StreamWrapper = styled.div`
  flex: 1;
  text-align: center;
  width: calc(100vw - 400px);
`;

const ScriptWrapper = styled.div`
  width: 400px;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

const CaptionWrapper = styled.div`
  height: ${({ theme }) => theme.layoutSizes.videoCaption};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export default VideoLayout;
