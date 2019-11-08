import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  AUTHENTICATING,
  UserContext,
  handleSignInWithEmailLink,
  getRedirectResult,
  onAuthStateChanged
} from "./firebase/auth";

import Auth from "./routes/Auth";
import Index from "./routes/Index";
import DashBoard from "./routes/DashBoard";

import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";

import "./style.css";

console.log(process.env.REACT_APP_TEST);

function App() {
  const [user, setUser] = useState(AUTHENTICATING);
  handleSignInWithEmailLink();
  getRedirectResult(user => {
    console.log("LOGGED IN", user);
  });
  useEffect(() => {
    onAuthStateChanged(user => {
      return user ? setUser(user) : setUser(null);
    });
  }, []);
  if (user === AUTHENTICATING) {
    return <div />;
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Switch>
          <PrivateRoute path="/dashboard" component={DashBoard} />
          <AuthRoute path="/auth" component={Auth} />
          <Route path="/" exact component={Index} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
