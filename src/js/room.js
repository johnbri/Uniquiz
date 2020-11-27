import React, { useEffect, useState } from "react";
import { RoomView } from "./view/roomView";
import {auth, database} from '../services/firebase.js';

function Room(props){


    auth().onAuthStateChanged(()=> {
        let user = auth().currentUser;
        console.log(user.uid)
        database.ref('rooms/' + "rum1").set({
            players: user.uid})
        })
    
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