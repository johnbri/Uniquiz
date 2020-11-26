import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import { SignupView } from "./view/signupView";
import {auth, database} from '../services/firebase.js';

function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token) {
      setToken(_token);

    }
  }, [token]);

  return user ? React.createElement(SpotifyConnectView, {
    url: loginUrl
  }) : React.createElement(SignupView, {
    onEmail: (txt) => setEmail(txt),
    onName: (txt) => setName(txt),
    onPassword: (txt) => setPassword(txt),
    onSignup: () => { 
      setUser(signupFirebase(email, name, password));
      
    }
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

export default Signup;