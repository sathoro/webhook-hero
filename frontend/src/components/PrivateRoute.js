import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppState } from "../state";

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useAppState();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
