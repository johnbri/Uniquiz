import React, { useEffect, useState } from "react";
import { StartView } from "./view/startView";
import {auth, database} from '../services/firebase.js';
import userModel from "../index.js";

function Start(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return React.createElement(StartView, {
    onEmail: (txt) => setEmail(txt),
    onPassword: (txt) => setPassword (txt),
    onLogin: () => Login(props, email, password), //ev. byta namn på funktionen
    onSignUp: () => props.history.push("/signup")
    });
}

function Login (props, email, password) {
  auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    props.history.push("/spotifyConnect");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
export default Start;