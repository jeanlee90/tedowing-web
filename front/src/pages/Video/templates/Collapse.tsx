import React, { useState } from "react";
import styled from "styles/theme-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

interface TProps {
  title: string;
  children: React.ReactNode;
}

function Collapse({ title, children }: TProps) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  return (
    <CollapseWrapper>
      <CollapseTitle onClick={handleToggle}>
        <CollapseTitleText>{title}</CollapseTitleText>
        <CollapseIcon>
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
        </CollapseIcon>
      </CollapseTitle>
      {open && <CollapseContent>{children}</CollapseContent>}
    </CollapseWrapper>
  );
}

const CollapseWrapper = styled.div.attrs(() => ({ role: "button" }))`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const CollapseTitle = styled.div`
  display: flex;
  padding: 16px 12px;
  text-overflow: ellipsis;
`;

const CollapseTitleText = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.title};
  width: calc(100% - 25px);
`;

const CollapseIcon = styled.div``;

const CollapseContent = styled.div`
  position: absolute;
  left: -1px;
  right: -1px;
  z-index: 1;
  padding: 16px 12px;
  word-break: keep-all;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-top: 1px solid ${({ theme }) => theme.colors.text};
`;

export default Collapse;
