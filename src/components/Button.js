/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const buttonStyles = css`
  background-color: white;
  border: 2px solid rebeccapurple;
  border-radius: 4px;
  padding: 8px 12px;
  text-decoration: none;
  color: rebeccapurple;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease 0s;

  &:hover {
    color: white;
    background-color: rebeccapurple;
  }
`;

export default function Button({ component: Component = "button", ...props }) {
  return <Component css={buttonStyles} {...props} />;
}
