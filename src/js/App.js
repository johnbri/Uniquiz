import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Login from "./login.js";
import Room from "./room.js";
import QuizAnswers from "./quizAnswers.js";
import PlayersSidebar from './playersSidebar.js';
import CreateJoinRoom from "./createJoinRoom.js";
import QuizPlaying from "./quizPlaying.js";
import SpotifyConnect from "./spotifyConnect";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  /**Renders different components depeding on path */
  return <div className="app">
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room" component={Room} />
          <Route path='/quizAnswers' render={props =>
            <div>
              <QuizAnswers />
              <PlayersSidebar />
            </div>
          } />
          <Route path='/quizPlaying' render={props =>
            <div>
              <QuizPlaying />
              <PlayersSidebar />
            </div>
          } />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
        </Switch> 
      </div>
    </Router>
  </div>;
}

export default App;