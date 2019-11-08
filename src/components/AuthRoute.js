import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext, AUTHENTICATING } from "../firebase/auth";

export default function AuthRoute({ component: Component, ...rest }) {
  const user = useContext(UserContext);
  if (user === AUTHENTICATING) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={props =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
