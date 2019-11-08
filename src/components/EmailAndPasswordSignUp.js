/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import { emailAndPasswordSignUp } from "../firebase/auth";

import Button from "./Button";
import Input from "./Input";

const EmailAndPasswordSignUp = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div
      css={css`
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
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
      `}
    >
      <h3
        css={css`
          margin: 20px 0 4px 0;
        `}
      >
        Sign Up
      </h3>
      <Input
        css={css`
          margin: 4px 0 4px 0;
        `}
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Input
        css={css`
          margin: 4px 0 8px 0;
        `}
        placeholder="Password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <Button
        css={css`
          margin: 8px 0 20px 0;
        `}
        onClick={() => emailAndPasswordSignUp(email, password)}
      >
        Sign Up
      </Button>
      <Button
        css={css`
          margin: 20px 0 12px 0;
        `}
        onClick={() => history.push("/auth")}
      >
        cancel
      </Button>
    </div>
  );
};

export default EmailAndPasswordSignUp;
