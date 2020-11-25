import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { loginUrl, getTokenFromUrl} from "./spotify";
import { LoginView } from "../js/view/loginView";



function Login({props}) {
  
  const [token, setToken] = useState();
  
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token) {
      setToken(_token);

    }
  }, [token]);

  return token ? setUrl() : React.createElement(LoginView, {
    url: loginUrl
  });
}
export default Login;

function setUrl() {
  window.location = "/home";
}