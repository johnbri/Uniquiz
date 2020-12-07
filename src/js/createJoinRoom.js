import React, { useEffect, useState } from "react";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/createJoinRoomView';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";
import {createJoinRoomFB} from "./readRoomModel.js";
import useModelProp from "./useModelProp.js";


function CreateJoinRoom(props){
    /** Create different view depending on if the user want to create or join room */
    const [room, setRoom ] = useModelProp(roomModel, "roomName");
    const [roomName, setRoomName]= React.useState("");
    let createRoom = props.location.createRoom;
   
    return React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {
            createJoinRoomFB(roomName, createRoom);
            props.history.push("/room")
        },
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home")
    });
}
export default CreateJoinRoom;