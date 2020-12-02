import React, { useEffect, useState } from "react";
import { RoomView } from "./view/roomView";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/joinCreateRoomView';

function Room(props){
    const [user,setUser] = React.useState();
    auth().onAuthStateChanged((userObject) => {
        if(userObject) {
            const user = auth().currentUser;
            database.ref('rooms/' + user.uid).set({
                players: [user.uid],
                name: "Example quiz"})
        } else {
            console.log("hej");
        }
    });
    return React.createElement(CreateJoinRoomView, {
        newRoom: false,
        createRoom: console.log("hej"),
        joinRoom: console.log("hej"),
        onText: console.log("hej")
    });
    /*return React.createElement(RoomView,{
        onText: text => database.ref(
            'rooms/'+ user.uid + "/name").set(text),
        players: "hej",
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
    });*/
}


export default Room;