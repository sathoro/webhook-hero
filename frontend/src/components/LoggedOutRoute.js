import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppState } from "../state";

export default function LoggedOutRoute({ children, ...rest }) {
  const { user } = useAppState();

  return (
    <Route {...rest}>
      {!user ? children : <Redirect to="/dashboard"></Redirect>}
    </Route>
  );
}
