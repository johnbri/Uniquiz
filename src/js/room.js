import React, { useEffect, useState } from "react";
import { RoomView } from "./view/roomView";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/createJoinRoomView';
import userModel from "../index.js";
import useModelProp from "./useModelProp";
import roomName from "./home"

function Room(props){
    /*let playerNames = []
    roomName = "hej"
    console.log(userModel.uid)

    database.ref('rooms/').set(
        {roomName: {
            playerNames: [userModel.displayName],
            name: "Example quiz"}
        })
    
    database.ref('rooms/' + userModel.uid + "/players")
                 .on('value', (snapshot) => { 
                    playerNames = snapshot.val()})
    console.log(playerNames)
    let players = {}

    playerNames.forEach(player => {
        database.ref('users/' + {player})
        .on('value', (snapshot) => { 
            players = snapshot.val()})})
    
    console.log(players)
            */
    return React.createElement(RoomView,{
        roomName: "hej",
        playerNames: "hej",
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
    });
}


export default Room;