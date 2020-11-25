import React, { useEffect, useState } from "react";
import '../css/App.css';
import Login from "./Login";
import { getTokenFromUrl, getUser } from "./spotify";
import  usePromise  from "./usePromise";
import Home from "./home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
/*import {database} from '../services/firebase.js';*/


/*database.ref('users/' + "erik").set({
  username: "Mikaela xD",
  email: "test",
  profile_picture : "hej"
});
*/

function App() {
  return <div className="app">
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch> 
      </div>
    </Router>
  </div>;
}

export default App;