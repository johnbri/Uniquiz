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
  Route,
} from "react-router-dom";
import AllowedAccess from './withAuth.js'
import { useState} from "react";
import {auth} from '../services/firebase.js'


function App() {
  /**Renders different components depeding on path */
  const [user, setUser] = useState(null);
  
  auth().onAuthStateChanged((userObject) => {
    if (userObject) {
      setUser(true);

    } else {
      setUser(false);
    }
  });

  return <div className="app">
    <Router>
      <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <AllowedAccess thePath="/home" isAuth={user} component={Home} />
          <AllowedAccess thePath="/spotifyConnect" isAuth={user}  component={SpotifyConnect} />
          <AllowedAccess thePath="/quiz/create" isAuth={user} component={CreateJoinRoom} />
          <AllowedAccess thePath="/quiz/join" isAuth={user} component={CreateJoinRoom} />
          <AllowedAccess thePath="/quiz" isAuth={user} component={PlayersSidebar} />
          <AllowedAccess thePath="/quiz/room" isAuth={user} component={Room} />
          <AllowedAccess thePath="/quiz/playing" isAuth={user} component={QuizPlaying} />
          <AllowedAccess thePath="/quiz/answers" isAuth={user} component={QuizAnswers} />
          <AllowedAccess thePath="/results" isAuth={user} component={Results} />
      </div> 
    </Router>
  </div>;
}

export default App;