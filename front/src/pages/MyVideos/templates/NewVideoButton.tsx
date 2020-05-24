import React from "react";
import styled from "styles/theme-components";
import Button from "components/atoms/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TProps {}

function NewVideoButton({}: TProps) {
  return (
    <Button primary circle icon={<FontAwesomeIcon icon={faPlus} />}>
      New Video
    </Button>
  );
}

const SAddVideoButton = styled.div``;

export default NewVideoButton;
