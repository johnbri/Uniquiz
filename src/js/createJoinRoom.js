import React from "react";
import { CreateJoinRoomView }from './view/createJoinRoomView';
import {createJoinRoomFB} from "./readRoomModel.js";


function CreateJoinRoom(props){
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