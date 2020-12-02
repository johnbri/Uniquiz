import React, { useEffect, useState } from "react";
import { RoomView } from "./view/roomView";
import {auth, database} from '../services/firebase.js';

function Room(props){
    const [user,setUser] = React.setState("")
    auth().onAuthStateChanged(()=> {
        user = auth().currentUser;
        database.ref('rooms/' + user.uid).set({
            players: [user.uid],
            name: "Example quiz"})
    })
    return React.createElement(RoomView,{
        onText: text => database.ref(
            'rooms/'+ user.uid + "/name").set(text),
        players: database.ref('rooms/' + user.uid + "/players"),
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
        });
}

export default Room;