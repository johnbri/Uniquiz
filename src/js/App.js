import React, { useEffect, useState } from "react";
import '../css/App.css';
import Login from "./Login";
import { getTokenFromUrl, getUser } from "./spotify";
/*import {database} from '../services/firebase.js';*/

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
    }

    console.log("token", token);
  }, [token]);

  return <div className="app">{token ? console.log(getUser(token).id): <Login />}</div>;
}

export default App;