import React from "react";
import "../css/Login.css";
import { loginUrl } from "./spotify";
import { LoginView } from "./view/loginView";

function Login() {
  return React.createElement(LoginView, {
    url: loginUrl
  });
}
export default Login;
