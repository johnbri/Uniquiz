import React, { useEffect, useReducer, useState } from "react";
import { StartView } from "./view/startView";
import {auth, database} from '../services/firebase.js';
import {userModel} from "./App";

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
    userModel.setUser(auth().currentUser);
    userModel.setuid();
    database.ref('users/' + auth().currentUser.uid + '/displayName').on('value', (snapshot) => { // Gör detta här, för om man gör det i modellen så kommer this. inte funka då den kommar att callas efter att man är ute ur modellen...
        userModel.setDisplayName(snapshot.val());                                                // man kan kanske skicka in userModel in i userModel för att kunna komma åt den... men är nog nt så bra
        console.log("Displayname " + snapshot.val() + " has been added to model");
    });
    props.history.push("/spotifyConnect");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}
export default Start;