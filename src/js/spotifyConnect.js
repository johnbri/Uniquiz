import React, { useEffect, useState } from "react";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import {auth, database} from '../services/firebase.js';


function SpotifyConnect(props) {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;
    if (token){
        addTokenDB(token);
    }
    
  return token ? setPath(props) : React.createElement(SpotifyConnectView, {
    url: loginUrl
  });
}

function setPath(props) {
    props.history.push("/home");
    return null;
  }

function addTokenDB(token) {
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        token: token
      }).then( res => console.log("successfully added token to user in database")).catch(console.log("Error adding token to firebase DB"));
    } else {
      console.log("There is no user logged in");
    }
  });
}

export default SpotifyConnect;