import React from "react";
import styled from "styles/theme-components";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PageLoader() {
  return (
    <LoaderWrapper>
      <FontAwesomeIcon icon={faSpinner} pulse />
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div`
  text-align: center;
  padding: 3em;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export default PageLoader;
