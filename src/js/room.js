import React, { useEffect, useState } from "react";
import { RoomView } from "./view/roomView";
import {auth, database} from '../services/firebase.js';

function Room(props){
    let user = auth.currentUser;
    console.log(user)
    //let roomName = database.ref('rooms/' + user.uid)
    
    //let players = database.ref('rooms/' + user.uid).set({
       // players: [user]})

    const [promise, setPromise]= React.useState();
    /*
    useEffect(()=>
        setPromise(currentDish && DishSource.getDishDetails(currentDish)),
        [currentDish]);*/

    return React.createElement(RoomView, {
        //roomName: roomName,
        players: [],
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
        });
}

export default Room;