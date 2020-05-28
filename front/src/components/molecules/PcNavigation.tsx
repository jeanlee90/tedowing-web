import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styles/theme-components";
import { TMenu } from "components/organisms/AppContainer";
import Copyright from "components/atoms/Copyright";
import useRouter from "lib/hooks/useRouter";

interface TProps {
  menu: TMenu[];
}

function PcNavigation({ menu }: TProps) {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);
  const changeCurrentPath = (pathname: string) => {
    const paths = pathname.split("/");
    setCurrentPath(`/${paths[1]}/${paths[2]}`);
  };

  useEffect(() => {
    const { history } = router;
    changeCurrentPath(history.location.pathname);

    const unlisten = history.listen(() => changeCurrentPath(history.location.pathname));
    return () => unlisten();
  }, []);

  return (
    <Sider>
      <Nav>
        {menu.map((m, i) => (
          <Item key={i} className={m.link === currentPath ? "active" : ""}>
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
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const Nav = styled.div`
  padding: 24px 0;
`;

const Item = styled.div`
  cursor: pointer;
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.secondaryText};

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const ItemIcon = styled.div`
  display: inline-block;
  margin-right: 8px;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

PcNavigation.defaultProps = {
  menu: [],
};

export default PcNavigation;
