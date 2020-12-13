import {auth} from '../services/firebase.js';
import { Redirect } from 'react-router-dom'; 
import { roomModel } from '../index.js';

const GameInProgress = (Component) => {
    const AuthRoute = () => {
      const isInGame = roomModel.status == "inGame";
      if (isInGame) {
        return <Component />;
      } else {

        return <Redirect to="/home" />;
      }
    };
    return AuthRoute;
  };

  export default GameInProgress;