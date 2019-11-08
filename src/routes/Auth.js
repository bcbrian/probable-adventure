/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";

import { UserContext, AUTHENTICATING } from "../firebase/auth";

import LogInOptions from "../components/LogInOptions";
import SignInWithEmailLink from "../components/SignInWithEmailLink";
import SignInViaGitHub from "../components/SignInViaGitHub";
import EmailAndPasswordSignUp from "../components/EmailAndPasswordSignUp";
import EmailAndPasswordSignIn from "../components/EmailAndPasswordSignIn";

import HotPinkLogo from "../img/hot-pink-logo.png";

const Index = ({ location }) => {
  const user = useContext(UserContext);
  if (user === AUTHENTICATING) {
    return null;
  }
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          flex: 0 0 40%;
          background-color: rebeccapurple;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          alt="logo"
          src={HotPinkLogo}
          css={css`
            width: 200px;
          `}
        />
        <h3
          css={css`
            color: white;
            font-size: 48px;
            text-align: center;
          `}
        >
          Learn Code <br /> For Free
        </h3>
      </div>
      <div
        css={css`
          flex: 0 0 60%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            color: rebeccapurple;
            font-size: 48px;
          `}
        >
          Code Quests
        </h1>
        <div
          css={css`
            position: relative;
            width: 240px;
            height: 320px;
          `}
        >
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route path="/auth" exact component={LogInOptions} />
                <Route
                  path="/auth/sign-in/github"
                  exact
                  component={SignInViaGitHub}
                />
                <Route
                  path="/auth/sign-in/passwordless"
                  exact
                  component={SignInWithEmailLink}
                />
                <Route
                  path="/auth/sign-up"
                  exact
                  component={EmailAndPasswordSignUp}
                />
                <Route
                  path="/auth/sign-in"
                  exact
                  component={EmailAndPasswordSignIn}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Index;
