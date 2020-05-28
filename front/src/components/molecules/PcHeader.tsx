import React from "react";
import styled from "styles/theme-components";
import Logo from "components/atoms/Logo";
import Dropdown from "components/atoms/Dropdown";

interface TProps {
  email: string;
  onLogout: () => void;
}

function PcHeader({ email, onLogout }: TProps) {
  return (
    <Header>
      <Logo width={95} />
      <UserInfo>
        <Dropdown title={email} options={[{ text: "Log out", onClick: onLogout }]} />
      </UserInfo>
    </Header>
  );
}

const Header = styled.div`
  height: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserInfo = styled.div`
  flex: 1;
  text-align: right;
`;

export default PcHeader;
