import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Start from "./start.js";
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
  return <div className="app">
    <Router>
      <div>
          <Route exact path="/" component={Start} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/room" component={Room} />
          <Route path="/quizAnswers" component={QuizAnswers} />
          <Route path="/quizAnswers" component={QuizSidebar} />
          <Route path="/quizPlaying" component={QuizPlaying} />
          <Route path="/quizPlaying" component={QuizSidebar} />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
      </div>
    </Router>
  </div>;
}

export default App;