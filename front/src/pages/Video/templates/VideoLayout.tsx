import React from "react";
import styled from "styles/theme-components";

interface TProps {
  stream: React.ReactNode;
  script: React.ReactNode;
  caption: React.ReactNode;
}

function VideoLayout({ stream, script, caption }: TProps) {
  return (
    <SVideoLayout>
      <SVideoRow>
        <StreamWrapper>{stream}</StreamWrapper>
        <ScriptWrapper>{script}</ScriptWrapper>
      </SVideoRow>
      <CaptionWrapper>{caption}</CaptionWrapper>
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
  height: calc(100vh - 200px);
`;

const StreamWrapper = styled.div`
  flex: 1;
  text-align: center;
  width: calc(100vw - 400px);
`;

const ScriptWrapper = styled.div`
  width: 400px;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.text};
`;

const CaptionWrapper = styled.div`
  min-height: 200px;
  border-top: 1px solid ${({ theme }) => theme.colors.text};
`;

export default VideoLayout;
