import React from "react";
import { loginUrl, getTokenFromUrl, getUserPlaylists} from "./spotify";
import { SpotifyConnectView } from "./view/spotifyConnectView";
import {addTokenDB, addImgDB, addUserPlaylistToFB} from '../services/firebase.js';
import { useEffect, useState } from "react";
import { Redirect } from "react-router";


function SpotifyConnect(props) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    if (hash.access_token) {
      setToken(hash.access_token);
    }
  }, []);
  
  if (token){
    addTokenDB(token);
    addImgDB(token);
    getUserPlaylists(token).then(playlist => addUserPlaylistToFB(playlist));
  }

  return !token ? React.createElement(SpotifyConnectView, {
    onLogin: () => window.location.href = loginUrl,
    errorMessage: "Please accept connecting to Spotify before proceeding."
  })
  : <Redirect to="/home"/>
}

export default SpotifyConnect;