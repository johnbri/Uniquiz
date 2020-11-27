import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Start from "./start.js";
import Room from "./room.js";
import  SpotifyConnect from "./spotifyConnect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserModel from "./userModel"

export let userModel = new UserModel()

function App() {
  return <div className="app">
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room" component={Room} />
        </Switch> 
      </div>
    </Router>
  </div>;
}


export default App;