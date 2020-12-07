import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Login from "./login.js";
import Room from "./room.js";
import QuizAnswers from "./quizAnswers.js";
import QuizSidebar from './quizSidebar.js';
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
          <Route path="/quizAnswers" component={QuizAnswers} />
          <Route path="/quizAnswers" component={QuizSidebar} />
          <Route path="/quizPlaying" component={QuizPlaying} />
          <Route path="/quizPlaying" component={QuizSidebar} />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
        </Switch> 
      </div>
    </Router>
  </div>;
}

export default App;