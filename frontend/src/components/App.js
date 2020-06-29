import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Webhooks from "./Webhooks";
import CreateWebhook from "./CreateWebhook";
import LoggedOutRoute from "./LoggedOutRoute";
import PrivateRoute from "./PrivateRoute";
import RequestDetail from "./RequestDetail";
import { useAppState } from "../state";

export default function App() {
  const { isAuthReady } = useAppState();

  return isAuthReady ? (
    <Router>
      <Nav />

      <Switch>
        <LoggedOutRoute path="/login">
          <Login />
        </LoggedOutRoute>
        <LoggedOutRoute path="/register">
          <Register />
        </LoggedOutRoute>
        <PrivateRoute path="/logout">
          <Logout />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/webhooks/create">
          <CreateWebhook />
        </PrivateRoute>
        <PrivateRoute path="/webhooks">
          <Webhooks />
        </PrivateRoute>
        <PrivateRoute path="/request/:id">
          <RequestDetail />
        </PrivateRoute>
        <Route path="/"></Route>
      </Switch>
    </Router>
  ) : null;
}
