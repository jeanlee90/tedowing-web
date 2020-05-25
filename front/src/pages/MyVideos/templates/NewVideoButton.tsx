import React, { useState } from "react";
import Input from "components/atoms/Input";
import Modal from "components/atoms/Modal";
import Button from "components/atoms/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TProps {
  adding: boolean;
  onClick: (value: string) => Promise<boolean>;
}

function NewVideoButton({ adding, onClick }: TProps) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const handleClick = async (value: string) => {
    const success = await onClick(value);
    if (success) handleToggle();
  };

  return (
    <>
      <Button primary circle icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleToggle}>
        NEW VIDEO
      </Button>
      <Modal visible={open} title="New Video" onClose={handleToggle} keyboard={false} maskClosable={false}>
        <Input placeholder="Please enter the TED url..." button="Add Video" loading={adding} onEnter={handleClick} />
      </Modal>
    </>
  );
}

export default NewVideoButton;
