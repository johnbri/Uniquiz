import React from "react";
import {homeView} from "./view/homeView.js";
import {userModel} from "../index.js";
import useModelProp from "./useModelProp";
import {auth, removeUserFromRoomFB} from '../services/firebase.js';
import NoDataView from './view/noDataView.js';

function Home(props) {
    /**Presenter of the home view. The user can select to create or join a quiz. */
    const userImg = useModelProp(userModel, "img");
    const displayName = useModelProp(userModel, "displayName");
    const data = [userImg, displayName]
    let dataRetrieved = data.some(dt => dt === null || dt.length === 0 );

    return dataRetrieved ? NoDataView("Loading homepage") : React.createElement(homeView, {
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