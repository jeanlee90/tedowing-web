import React from "react";
import styled from "styles/theme-components";

interface TProps {
  mobile: boolean;
  header: React.ReactNode;
  navigation: React.ReactNode;
  children: React.ReactNode;
}

function Layout({ mobile, header, navigation, children }: TProps) {
  const NavWrapper = mobile ? MobileNav : PcNav;

  return (
    <SLayout>
      <HeaderWrapper>{header}</HeaderWrapper>
      <NavWrapper>{navigation}</NavWrapper>
      {children}
    </SLayout>
  );
}

const SLayout = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: ${({ theme }) => theme.layoutSizes.header};
`;

const MobileNav = styled.div``;

const PcNav = styled.div`
  width: ${({ theme }) => theme.layoutSizes.pcNavigation};
  position: fixed;
  left: 0;
  bottom: 0;
  top: ${({ theme }) => theme.layoutSizes.header};
`;

export default Layout;
