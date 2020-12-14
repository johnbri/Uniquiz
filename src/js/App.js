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
    <script src="https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js"></script>
    <Router>
      <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
          <Route path="/quiz" component={PlayersSidebar} />
          <Route path="/quiz/room" component={Room} />
          <Route path="/quiz/playing" component={QuizPlaying}/>
          <Route path="/quiz/answers" component={QuizAnswers}/>
          <Route exact path="/results" component={Results} />
      </div> 
    </Router>
  </div>;
}

export default App;