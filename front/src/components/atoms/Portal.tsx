import React from "react";
import { useMemo } from "react";
import { createPortal } from "react-dom";

interface TProps {
  elementId: string;
  children: React.ReactNode;
}

function Portal({ children, elementId }: TProps) {
  const rootElement = useMemo(() => document.getElementById(elementId), [elementId]);
  if (rootElement === null) return <div />;

  return createPortal(children, rootElement);
}

export default Portal;
