import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./app/App";
import "./styles/main.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = localStorage.getItem("theme") || "dark";
document.body.className = theme;

root.render(
  <GoogleOAuthProvider clientId="420163074453-hmdedlf2pi3eafmf7hv3g9q796aqo0jg.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
