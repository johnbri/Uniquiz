import React from "react";
import { CreateJoinRoomView }from './view/createJoinRoomView';
import userModel from "../index.js";
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

async function CreateJoin(createRoom, roomName){
    let roomModel = await ReadRoomModel(createRoom, roomName);
    roomModel.addPlayers(userModel.uid);
}