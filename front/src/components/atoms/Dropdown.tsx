import React, { useRef, useState, useEffect } from "react";
import styled from "styles/theme-components";
import useOnClickOutside from "lib/hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export interface TOption {
  text: string;
  link?: string;
  onClick?: () => void;
}

interface TProps {
  title: string;
  options: TOption[];
}

function Dropdown({ title, options }: TProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // 바깥 영역 클릭 시 닫기
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleClose);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownTitle onClick={() => setOpen(!open)}>
        {title}
        <DropdownAngle>
          <FontAwesomeIcon icon={faAngleDown} />
        </DropdownAngle>
      </DropdownTitle>
      {open && (
        <DropdownOptions>
          {options.map(o => (
            <DropdownOption>{o.text}</DropdownOption>
          ))}
        </DropdownOptions>
      )}
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const DropdownTitle = styled.div`
  cursor: pointer;
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.success};

  &:hover {
    font-weight: 700;
  }
`;

const DropdownAngle = styled.div`
  display: inline-block;
  padding-left: 6px;
`;

const DropdownOptions = styled.ul`
  overflow: hidden;
  position: relative;
  text-align: left;
  padding: 4px 0;
  margin-top: 7px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 1050;
`;

const DropdownOption = styled.li`
  cursor: pointer;
  display: block;
  padding: 5px 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: ${({ theme }) => theme.fontSizes.text};
  line-height: 1.5;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export default Dropdown;
