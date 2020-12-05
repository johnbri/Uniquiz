import React from "react";
import { homeView } from "./view/homeView.js";
import userModel from "../index.js";
import useModelProp from "./useModelProp";
import {auth} from '../services/firebase.js';


function Home(props) {
    const displayName = useModelProp(userModel, "displayName");

    return  React.createElement(homeView, {
        userName: displayName,
        onCreate: () => props.history.push({
            pathname: '/createJoin',
            createRoom: true
        }),
        onJoin: () => props.history.push({
            pathname: '/createJoin',
            createRoom: false
        }),
        onLogOut: () => {
            auth().signOut().then(()=> {
                props.history.push('')})
                .then(console.log("successful logout")).then(console.log(auth().currentUser))
            } 
    });
}

export default Home;