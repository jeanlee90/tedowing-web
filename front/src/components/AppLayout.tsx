import React from "react";
import styled from "styles/theme-components";

interface TProps {
  children: React.ReactNode;
}

function AppLayout({ children }: TProps) {
  return <SAppLayout>{children}</SAppLayout>;
}

const SAppLayout = styled.div`
  min-height: 100vh;
  background-color: black;
`;

export default AppLayout;
