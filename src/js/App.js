import React, { useEffect, useState } from "react";
import '../css/App.css';
import Signup from "./signup";
import { getTokenFromUrl, getUser } from "./spotify";
import  usePromise  from "./usePromise";
import Home from "./home";
import Start from "./start.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return <div className="app">
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
        </Switch> 
      </div>
    </Router>
  </div>;
}

export default App;