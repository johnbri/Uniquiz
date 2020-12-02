import React, { useEffect, useState } from "react";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/joinCreateRoomView';

function CreateJoinRoom(props){
    let newRoom = props.location.newRoom;
    console.log(newRoom);
    return React.createElement(CreateJoinRoomView, {
        title: newRoom ? "Create" : "Join",
        onSubmit: newRoom ? console.log("create room") : console.log("join"),
        onText: console.log("hej"),
        onBack: () => props.history.push("/home")
    });
}

export default CreateJoinRoom;