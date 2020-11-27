import React, { useEffect, useState } from "react";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import { SignupView } from "./view/signupView";
import {auth, database} from '../services/firebase.js';

function Signup(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  return user ? setPath(props, user) : React.createElement(SignupView, {
    onEmail: (txt) => setEmail(txt),
    onName: (txt) => setName(txt),
    onPassword: (txt) => setPassword(txt),
    onSignup: () => { 
      setUser(signupFirebase(email, name, password));
    }
  });
}

function setPath(props, user) {
  console.log("user", user);
  props.history.push("/spotifyConnect");
  return null;
}

function signupFirebase(email, name, password) {
  return auth().createUserWithEmailAndPassword(email, password)
  .then(userRecord => console.log("Successfully created new user")).then(() =>  {
    database.ref('users/' + auth().currentUser.uid).set({
    displayName: name
    })
  }).catch((er) => console.log(er));
}

export default Signup;