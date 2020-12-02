import React, { useEffect, useState } from "react";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/createJoinRoomView';
import RoomModel from './roomModel.js';
import userModel from "../index.js";
import roomModel from "./roomModel.js";
import ReadRoomModel from "./readRoomModel.js";

function CreateJoinRoom(props){
    const [roomName, setRoomName]= React.useState("");
    let createRoom = props.location.createRoom;
   
    return React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {CreateJoin(createRoom, roomName)
            props.history.push("/rooms/" + roomName)},
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home")
    });
}
export default CreateJoinRoom;

function CreateJoin(createRoom, roomName){
    let room = ReadRoomModel(createRoom, roomName);
    //room.addPlayers(userModel.uid);
}