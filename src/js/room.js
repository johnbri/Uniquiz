import React from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel} from "../index.js";
import PromiseNoData from './view/promiseNoData.js';
import useModelProp from "./useModelProp"


function Room(props){
    //players= ["gkgpZ7UbAAb530u8CES1SEK1Im83", "cv4yGGhfXoWKfIueyQdP1BNMPT43"]
    
    return React.createElement(RoomView,{
            roomName: "hej",
            playerNames: "hej",
            onExit: () => props.history.push("/home"),
            onStart: () => props.history.push("/quiz")
            });
}

export default Room;