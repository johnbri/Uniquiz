import React from "react";
import {userModel} from "../index.js";
import { CreateJoinRoomView }from './view/createJoinRoomView';
import {createJoinRoomFB} from "./readRoomModel.js";
import {auth} from '../services/firebase.js';



function CreateJoinRoom(props){
    /** Create different view depending on if the user want to create or join room */
    //const [room, setRoom ] = useModelProp(RoomModel, "roomName");
    const [roomName, setRoomName]= React.useState("");
    let createRoom = props.location.createRoom;
   
    return React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {
            createJoinRoomFB(roomName, createRoom);
            props.history.push("/room")
        },
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home"),
        onLogOut: () => {
            auth().signOut().then(()=> {
                props.history.push('')})
                .then(console.log(userModel.getDisplayName())).then(console.log(auth().currentUser))
            }
    });
}
export default CreateJoinRoom;