import React, { useEffect, useState } from "react";
import RoomView from "./view/roomView";
import PlayersSidebarView from "./view/playersSidebarView";
import {auth, database} from '../services/firebase.js';
import { CreateJoinRoomView }from './view/createJoinRoomView';
import userModel from "../index.js";
import useModelProp from "./useModelProp";
import roomName from "./home"
import roomModel from "./roomModel"

function Room(props){
    return React.createElement(RoomView,{
        roomName: "hej",
        playerNames: "hej",
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
    });
}


export default Room;