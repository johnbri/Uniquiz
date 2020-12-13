import React, { useState } from "react";
import { SignupView } from "./view/signupView";
import {signupFB} from '../services/firebase.js';

function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  
  //When the user is set in firebase the user will be redirected to the home view
  return user ? setPath(props, user) : React.createElement(SignupView, {
    onEmail: (txt) => setEmail(txt),
    onName: (txt) => setName(txt),
    onPassword: (txt) => setPassword(txt),
    onSignup: () => signupFB(props, email, name, password),
    onLogin: () => {
      props.history.push("/")
    },
    errorMessage: props.location.errorMessage
  });
}

function setPath(props) {
  props.history.push("/spotifyConnect");
  return null;
}

export default Signup;