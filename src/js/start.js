import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import { StartView } from "./view/startView";
import {auth, database} from '../services/firebase.js';

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

function setUrl() {
  window.location = "/home";
}

function signupFirebase(email, name, password) {
  auth().createUserWithEmailAndPassword(email, password)
  .then(userRecord => console.log("Successfully created new user")).catch((er) => console.log(er));
  let user = auth().currentUser;
  database.ref('users/' + user.uid).set({
    displayName: name
  }); 
  return user;
}

export default Start;