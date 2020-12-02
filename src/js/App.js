import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Start from "./start.js";
import Room from "./room.js";
import playlistPresenter from "./quiz.js";
import CreateJoinRoom from "./createJoinRoom.js";
import  SpotifyConnect from "./spotifyConnect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
          <Route exact path="/quiz" component={playlistPresenter} />

          <Route exact path="/createJoin" component={CreateJoinRoom} />
        </Switch> 
      </div>
    </Router>
  </div>;
}

export default App;