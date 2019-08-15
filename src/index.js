import React from "react";
import ReactDOM from "react-dom";
import { Grommet } from "grommet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Firebase from "./firebase";
import Auth from "./firebase/containers/Auth";
import Authenticate from "./components/Authenticate";
import TopNav from "./components/TopNav";

import Initiative from "./routes/Initiative";
import NewInitiative from "./routes/NewInitiative";
import Dashboard from "./routes/Dashboard";

import "./styles.css";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <Grommet theme={theme}>
      <GlobalStyle />
      <Firebase
        config={{
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOAMIN,
          databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
        }}
      >
        <Auth>
          {({ user, handleSignOut, handleSignIn, handleSignUp }) => (
            <div>
              <TopNav>
                <Authenticate
                  user={user}
                  onSignOut={handleSignOut}
                  onSignIn={handleSignIn}
                  onSignUp={handleSignUp}
                />
              </TopNav>
              {user && (
                <Router>
                  <Switch>
                    <Route path="/" exact>
                      {routeProps => <Dashboard user={user} {...routeProps} />}
                    </Route>
                    <Route path="/initiatives/new">
                      {routeProps => (
                        <NewInitiative user={user} {...routeProps} />
                      )}
                    </Route>
                    <Route path="/initiatives/:initiativeId">
                      {routeProps => <Initiative user={user} {...routeProps} />}
                    </Route>
                  </Switch>
                </Router>
              )}
            </div>
          )}
        </Auth>
      </Firebase>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
