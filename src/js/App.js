import React, { useEffect, useState } from "react";
import '../App.css';
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import {database} from '../services/firebase.js';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

/*database.ref('users/' + "erik").set({
  username: "Mikaela xD",
  email: "test",
  profile_picture : "hej"
});
*/

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }

    console.log("token", token);
  }, [token]);

  return <div className="app">{token ? <h1>Logged in</h1> : <Login />}</div>;
}

export default App;