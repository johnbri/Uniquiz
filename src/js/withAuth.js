import {auth} from '../services/firebase.js';
import { Redirect } from 'react-router-dom'; 

const withAuth = (Component) => {
    const AuthRoute = () => {
      const isAuth = auth().currentUser;
      if (isAuth) {
        return <Component />;
      } else {
        return <Redirect to="/" />;
      }
    };
    return AuthRoute;
  };

  export default withAuth;