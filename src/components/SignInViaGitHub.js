/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import {
  signInViaGitHubPopUp,
  signInViaGitHubRedirect
} from "../firebase/auth";

import Button from "./Button";

const SignInViaGitHub = ({ history }) => (
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
        margin: 20px 0 8px 0;
      `}
    >
      Sign in via GitHub
    </h3>
    <Button
      css={css`
        margin: 8px 0 8px 0;
      `}
      onClick={() => signInViaGitHubPopUp()}
    >
      Pup-up Sign In
    </Button>
    <Button
      css={css`
        margin: 8px 0 8px 0;
      `}
      onClick={() => signInViaGitHubRedirect()}
    >
      Redirect Sign In
    </Button>
    <Button
      css={css`
        margin: 20px 0 4px 0;
      `}
      onClick={() => history.push("/auth")}
    >
      cancel
    </Button>
  </div>
);

export default SignInViaGitHub;
