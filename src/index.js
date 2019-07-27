import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  Grommet,
  Select,
  Heading,
  FormField,
  TextInput
} from "grommet";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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

function Initiative({ user, match, location, history }) {
  const [value, setValue] = useState("");
  return (
    <Database dataRef={`/initiativeData/${match.params.initiativeId}`}>
      {({
        data: initiativeData,
        update: initiativeUpdate,
        create: initiativeCreate,
        custom: initiativeCustom
      }) => {
        if (!initiativeData) {
          return <div>ask your dm for access...</div>;
        }
        return (
          <div>
            <Heading margin="none">{initiativeData.name}</Heading>
            <Box>
              <FormField label="Role for initiative">
                <TextInput
                  placeholder="type here"
                  value={value}
                  onChange={event => setValue(event.target.value)}
                />
              </FormField>
              <Button
                label="Roll"
                onClick={() =>
                  initiativeUpdate({
                    ...initiativeData,
                    text: initiativeData.text
                      ? initiativeData.text + value
                      : value
                  })
                }
              />
              <Heading margin="none">{initiativeData.text}</Heading>
            </Box>
          </div>
        );
      }}
    </Database>
  );
}

function Dashboard({ user, match, location, history }) {
  return (
    <Database dataRef={`/users/${user.uid}`}>
      {({
        data: userData,
        update: userUpdate,
        create: userCreate,
        custom: userCustom
      }) => {
        return (
          <>
            <Button onClick={() => alert("go make init :P")} label="+" />
            <div>
              {userData &&
                userData.initiatives &&
                Object.keys(userData.initiatives).map(id => {
                  console.log("INIT => ", id);
                  return (
                    <div>
                      <Link to={`/initiatives/${id}`}>
                        {id} -> {userData.initiatives[id]}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </>
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
              {user && (
                <Router>
                  <Switch>
                    <Route path="/" exact>
                      {routeProps => <Dashboard user={user} {...routeProps} />}
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
