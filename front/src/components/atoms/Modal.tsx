import React, { useRef, useEffect, useCallback } from "react";
import styled from "styles/theme-components";
import useOnClickOutside from "lib/hooks/useOnClickOutside";
import Title from "./Title";
import Portal from "./Portal";
import useKeyPress from "lib/hooks/useKeyPress";

interface TProps {
  visible: boolean;
  title?: string | React.ReactNode;
  className?: string;
  closable?: boolean; // close 버튼 유무
  keyboard?: boolean; // Escape 버튼 클릭 시 닫기
  maskClosable?: boolean; // 바깥 영역 클릭 시 닫기
  onClose?: () => void;
  children?: React.ReactNode;
}

function Modal({ className, visible, title, closable, children, keyboard, maskClosable, onClose }: TProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  // maskClosable
  useOnClickOutside(ref, () => maskClosable && handleClose());

  // keyboard
  const escPress = useKeyPress("Escape");
  useEffect(() => {
    if (keyboard && escPress) handleClose();
  }, [escPress, keyboard]);

  // block scrolling
  useEffect(() => {
    if (visible) {
      const scrollY: string = (document.documentElement.scrollTop || document.body.scrollTop || window.scrollY) + "";
      document.body.style.cssText = `position: fixed; top: -${scrollY}px; width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: ""; width: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [visible]);

  return visible ? (
    <Portal elementId="modal-root">
      <ModalWrapper className={className} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner" ref={ref}>
          <ModalTitle>{title && <Title level={4}>{title}</Title>}</ModalTitle>
          {closable && <CloseButton className="modal-close" onClick={handleClose} />}
          <ModalContent>{children}</ModalContent>
        </ModalInner>
      </ModalWrapper>
      <ModalOverlay visible={visible} />
    </Portal>
  ) : (
    <div />
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  keyboard: true,
  maskClosable: true,
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${({ visible }: TProps) => (visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${({ visible }: TProps) => (visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 16px 18px;
  outline: 0;

  // size
  width: 90%;
  max-width: 480px;
  ${({ theme }) => theme.media.desktop(`width: 360px;`)}
`;

const ModalTitle = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.span.attrs(() => ({ role: "button" }))`
  position: absolute;
  top: 20px;
  right: 16px;
  width: 32px;
  height: 32px;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }

  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const ModalContent = styled.div`
  padding: 32px 0 12px 0;
`;

export default Modal;
