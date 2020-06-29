import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAppState } from "../state";
import Api from "../utils/Api";

export default function Logout() {
  const { onLogout } = useAppState();

  useEffect(() => {
    Api.post("/api/v1/logout").then(onLogout);
  }, [onLogout]);

  return <Redirect to="/login"></Redirect>;
}
