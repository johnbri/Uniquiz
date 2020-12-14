import React, { useState } from "react";
import { SignupView } from "./view/signupView";
import {signupFB} from '../services/firebase.js';
import { userModel } from "../index"

function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  //When the user is set in firebase the user will be redirected to the home view
  return React.createElement(SignupView, {
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

export default Signup;