import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext, AUTHENTICATING } from "../firebase/auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useContext(UserContext);
  if (user === AUTHENTICATING) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
