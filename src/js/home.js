import React from "react";
import {homeView} from "./view/homeView.js";
import {userModel} from "../index.js";
import useModelProp from "./useModelProp";
import {auth, removeUserFromRoomFB} from '../services/firebase.js';
import NoDataView from './view/noDataView.js';

function Home(props) {
    /**The user can create a room or join a room */
    const userImg = useModelProp(userModel, "img");
    const displayName = useModelProp(userModel, "displayName");
    const data = [userImg, displayName]
    return NoDataView(data, "Loading homepage") 
    || React.createElement(homeView, {
        userImg: userImg,
        userName: displayName,
        onCreate: () => props.history.push({
            pathname: '/quiz/create',
            createRoom: true
        }),
        onJoin: () => props.history.push({
            pathname: '/quiz/join',
            createRoom: false
        }),
        onLogOut: () => {
            auth().signOut().then(()=> {
                removeUserFromRoomFB();
                props.history.push('');
            })

        }
    })
}

export default Home;