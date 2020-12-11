import '../css/App.css';
import Signup from "./signup";
import Home from "./home";
import Login from "./login.js";
import Room from "./room.js";
import QuizAnswers from "./quizAnswers.js";
import PlayersSidebar from './playersSidebar.js';
import CreateJoinRoom from "./createJoinRoom.js";
import QuizPlaying from "./quizPlaying.js";
import Results from "./results.js";
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
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
          <Route path="/room" component={Room} />
          <Route path="/room" component={PlayersSidebar} />
          <Route path="/quizAnswers" component={QuizAnswers} />
          <Route path="/quizAnswers" component={PlayersSidebar} />
          <Route path="/quizPlaying" component={QuizPlaying} />
          <Route path="/quizPlaying" component={PlayersSidebar} />
          <Route exact path="/results" component={Results} hej={console.log("ldlsdlsad")}/>
      </div> 
    </Router>
  </div>;
}

export default App;