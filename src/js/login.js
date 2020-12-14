import React, { useState } from "react";
import { LoginView } from "./view/loginView";
import {loginFB} from '../services/firebase.js';

function Login(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return React.createElement(LoginView, {
    onEmail: (txt) => setEmail(txt),
    onPassword: (txt) => setPassword (txt),
    onLogin: () => loginFB(props, email, password),
    onSignUp: () => props.history.push("/signup"),
    errorMessage: props.location.errorMessage
    });
}

export default Login;