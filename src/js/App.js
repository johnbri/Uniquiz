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
        
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/spotifyConnect" component={SpotifyConnect} />
          <Route exact path="/home" component={Home} />
          <Route path="/room" component={Room} />
          <Route path="/room" component={PlayersSidebar} />
          <Route path='/quizAnswers' render={props =>
            <div>
              <QuizAnswers {...props}/>
              <PlayersSidebar {...props}/>
            </div>
          } />
          <Route path='/quizPlaying' render={props =>
            <div>
              <QuizPlaying {...props}/>
              <PlayersSidebar {...props}/>
            </div>
          } />
          <Route exact path="/createJoin" component={CreateJoinRoom} />
         
      </div>
    </Router>
  </div>;
}

export default App;