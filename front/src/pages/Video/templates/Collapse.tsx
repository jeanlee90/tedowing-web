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
  const getTitle = (isOpen: boolean) => (
    <CollapseTitle onClick={handleToggle}>
      <CollapseTitleText className={`${isOpen ? "collapse-open" : "collapse-close"}`}>{title}</CollapseTitleText>
      <CollapseIcon>
        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
      </CollapseIcon>
    </CollapseTitle>
  );

  return (
    <CollapseWrapper>
      {getTitle(false)}
      {open && (
        <CollapseContent>
          {getTitle(true)}
          <CollapseChildren>{children}</CollapseChildren>
        </CollapseContent>
      )}
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
`;

const CollapseTitleText = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.title};
  width: calc(100% - 30px);

  &.collapse-close {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.collapse-open {
    line-height: 1.5;
  }
`;

const CollapseIcon = styled.div`
  width: 25px;
  text-align: right;
`;

const CollapseContent = styled.div`
  position: absolute;
  top: 0;
  left: -1px;
  right: -1px;
  z-index: 1;
  word-break: keep-all;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const CollapseChildren = styled.div`
  padding: 12px 12px 16px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.text};
`;

export default Collapse;
