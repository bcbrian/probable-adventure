/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useContext } from "react";

import { UserContext, AUTHENTICATING } from "../firebase/auth";

import Button from "./Button";

const buttonStyle = css`
  width: 100%;
`;
const listItemStyles = css`
  list-style-type: none;
  margin: 12px 0;
  padding: 8px 0;
`;

const ulStyles = css`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  width: 240px;
  height: 320px;
  background: white;
  position: absolute;
  transition: opacity 250ms ease-in;

  &.fade-enter {
    opacity: 0;
    z-index: 1;
  }

  &.fade-enter.fade-enter-active {
    opacity: 1;
  }
`;

const hrStyles = css`
  color: rebeccapurple;
  width: 100%;
`;

const LogInOptions = ({ history }) => {
  const user = useContext(UserContext);
  if (user === AUTHENTICATING) {
    return null;
  }
  return (
    <>
      <ul css={ulStyles}>
        <li css={listItemStyles}>
          <Button
            css={buttonStyle}
            onClick={() => history.push("/auth/sign-in/github")}
          >
            sign in via github
          </Button>
        </li>
        <li css={listItemStyles}>
          <Button
            css={buttonStyle}
            onClick={() => history.push("/auth/sign-in/passwordless")}
          >
            sign in passwordless
          </Button>
        </li>
        <li css={listItemStyles}>
          <Button
            css={buttonStyle}
            onClick={() => history.push("/auth/sign-in")}
          >
            sign in
          </Button>
        </li>
        <hr css={hrStyles} />
        <li css={listItemStyles}>
          <Button
            css={buttonStyle}
            onClick={() => history.push("/auth/sign-up")}
          >
            sign up
          </Button>
        </li>
      </ul>
    </>
  );
};

export default LogInOptions;
