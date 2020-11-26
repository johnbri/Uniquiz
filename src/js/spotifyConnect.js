import React, { useEffect, useState } from "react";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import {auth, database} from '../services/firebase.js';

function SpotifyConnect(props) {
  const [token, setToken] = useState(null);


    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token){
        addTokenDB(_token);
    }

    console.log("tokkken", _token);
    
  return _token ? setPath(props) : React.createElement(SpotifyConnectView, {
    url: loginUrl
  });
}

function setPath(props) {
    props.history.push("/home");
    return null;
  }

function addTokenDB(token) {
    let user = auth().currentUser;
    database.ref('users/' + user.uid).set({
      token: token
    }).then( res => console.log("success").catch(console.log("err"))); 
}

export default SpotifyConnect;