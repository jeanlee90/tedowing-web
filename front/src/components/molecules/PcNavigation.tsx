import React from "react";
import { Link } from "react-router-dom";
import styled from "styles/theme-components";
import { TMenu } from "components/organisms/AppContainer";
import Copyright from "components/atoms/Copyright";

interface TProps {
  menu: TMenu[];
}

function PcNavigation({ menu }: TProps) {
  return (
    <Sider>
      <Nav>
        {menu.map((m, i) => (
          <Item key={i} aria-selected={"true"}>
            <Link to={m.link}>
              <ItemIcon>{m.icon}</ItemIcon>
              {m.text}
            </Link>
          </Item>
        ))}
      </Nav>
      <Footer>
        <Copyright />
      </Footer>
    </Sider>
  );
}

const Sider = styled.div`
  padding: 24px;
  width: 235px;
  position: fixed;
  left: 0;
  bottom: 0;
  top: ${({ theme }) => theme.layoutSizes.header};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.white};
`;

const Nav = styled.div`
  > *:last-child {
    padding-top: 24px;
  }
`;

const Item = styled.div`
  cursor: pointer;
  padding: 8px 0;
  color: ${({ theme }) => theme.colors.secondaryText};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ItemIcon = styled.div`
  display: inline-block;
  margin-right: 8px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 24px;
`;

PcNavigation.defaultProps = {
  menu: [],
};

export default PcNavigation;
