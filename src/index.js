import React from "react";
import ReactDOM from "react-dom";
import { Box, Button, Grommet, Select } from "grommet";

import Firebase from "./firebase";
import Auth from "./firebase/containers/Auth";
import Database from "./firebase/containers/Database";
import Authenticate from "./components/Authenticate";
import TopNav from "./components/TopNav";

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

function Dashboard(props) {
  console.log(props.user.uid);
  console.log(`/users/${props.user.uid}`);
  return (
    <Database dataRef={`/users/${props.user.uid}`}>
      {({ data: dashboardData, update, create, custom }) => {
        if (!dashboardData) {
          return <div>no data</div>;
        }
        return (
          <div>
            <Database dataRef={`/initiatives`}>
              {({ data: dashboardData, update, create, custom }) => {
                return (
                  <Button
                    onClick={() =>
                      create({
                        [props.user.uid]: "owner"
                        // [props.user.uid]: 'guest'
                      })
                    }
                    label="+"
                  />
                );
              }}
            </Database>
          </div>
        );
      }}
    </Database>
  );
}

function App() {
  return (
    <Grommet theme={theme}>
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
              {user && <Dashboard user={user} />}
            </div>
          )}
        </Auth>
      </Firebase>
    </Grommet>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
