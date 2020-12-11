import React from "react";
import { homeView } from "./view/homeView.js";
import {userModel} from "../index.js";
import useModelProp from "./useModelProp";
import {auth} from '../services/firebase.js';
import NoDataView from './view/noDataView.js';


function Home(props) {
    /**The user can create a room or join a room */
    const userImg = useModelProp(userModel, "img");
    const displayName = useModelProp(userModel, "displayName");
    const data = [userImg, displayName]
    

    return NoDataView(data) 
    || React.createElement(homeView, {
        userImg: userImg,
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
                .then(console.log(userModel.getDisplayName())).then(console.log(auth().currentUser))
            },
        onToQuiz: () => {
            props.history.push('/quizPlaying')
        } 
    })
}

export default Home;