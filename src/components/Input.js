/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const buttonStyles = css`
  background-color: white;
  border: 2px solid rebeccapurple;
  border-radius: 4px;
  padding: 8px 12px;
  color: #333;
  letter-spacing: 1.2px;
`;

export default function Input({ component: Component = "input", ...props }) {
  return <Component css={buttonStyles} {...props} />;
}
