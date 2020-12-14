import React from "react";
import { loginUrl, getTokenFromUrl, getUserImg, getUserPlaylists} from "./spotify";

import { SpotifyConnectView } from "./view/spotifyConnectView";
import {auth, database, addUserPlaylistToFB} from '../services/firebase.js';
import { userModel } from "../index.js";


function SpotifyConnect(props) {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;
    if (token){
        addTokenDB(token);
        addImgDB(token);
        getUserPlaylists(token).then(playlist => addUserPlaylistToFB(playlist)); // problemet är att man kan hinna starta rum innan den läggs in i modellen
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
  /** Add token revrived from spotify to firebase */
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        token: token
      }).then( res => console.log("successfully added token to user in database"));
    } else {
      console.log("There is no user logged in");
    }
  });
}

async function addImgDB(token) {
  let imgURL = await getUserImg(token);
  userModel.setImg(imgURL);
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        token: token,
        img: imgURL
      }).then( res => console.log("successfully added token to user in database")).catch(console.log("Error adding token to firebase DB"));
    } else {
      console.log("There is no user logged in");
    }
  });
}

/*async function getUserPlaylist (token) {

}*/
export default SpotifyConnect;