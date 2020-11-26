import React, { useEffect, useState } from "react";
import { StartView } from "./view/startView";

function Start(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return React.createElement(StartView, {
    onEmail: (txt) => setEmail(txt),
    onPassword: (txt) => setPassword (txt),
    onLogin: () => console.log("Login"),
    onSignUp: () => props.history.push("/signup")
    });
}
export default Start;