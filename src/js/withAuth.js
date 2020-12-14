import {auth, setUserRoomStatusToFB} from '../services/firebase.js';
import { Redirect, Route } from 'react-router-dom'; 
import { roomModel, userModel } from '../index.js';
import { useState, useEffect} from "react";
import useModelProp from "./useModelProp";
import NoDataView from './view/noDataView.js';
import { useHistory } from 'react-router-dom'

const AllowedAccess = ({component: Component, isAuth,thePath, ...rest}) => (
  isAuth ? <Route path={thePath} component={Component} /> : 
  (isAuth == false) ?  <Redirect to='/' /> : null
);
  
  /*console.log("jeio", rest);
  const AuthRoute = () => {
    let history = useHistory();
    const loggedIn = useModelProp(userModel, "loggedIn");
    //console.log("loginstatus", loginStatus);
    if (loggedIn === null) {
      return NoDataView([loggedIn])
    } else if (loggedIn === false) {
      history.push("/");
      return null;
    } else {
      if (userModel.inRoom) {
        setUserRoomStatusToFB(false);
        history.push("/home");
        console.log("if");
        return null;
      } else {
        setUserRoomStatusToFB(false);
        console.log("HEJ");
        return <Component props={rest}/>;
      }
    }
}
return AuthRoute;*/

export default AllowedAccess;