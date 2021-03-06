import React, {useState} from "react";
import {SignupView} from "./view/signupView";
import {signupFB} from '../services/firebase.js';

function Signup(props) {
  /**Signup presenter that creates an account using firebase */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
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