import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.generated.css";
import App from "./components/App";
import AppStateProvider from "./state";
import "./index.css";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

JavascriptTimeAgo.addLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
