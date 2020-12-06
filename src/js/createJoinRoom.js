import React, { useEffect, useState } from "react";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/createJoinRoomView';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";
import {getRoomFB} from "./readRoomModel.js";


function CreateJoinRoom(props){
    const [roomName, setRoomName]= React.useState("");
    let createRoom = props.location.createRoom;
   
    return React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {CreateJoin(createRoom, roomName)
            props.history.push("/room")},
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home")
    });
}
export default CreateJoinRoom;

function CreateJoin(createRoom, roomName){
    getRoomFB(roomName, createRoom);
    //let roomModel = await ReadRoomModel(createRoom, roomName);
    console.log(roomModel.roomName);
    //sätta currentroom i usermodel
    roomModel.addPlayers(userModel.uid);
}