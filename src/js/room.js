import React from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel} from "../index.js";
import PromiseNoData from './view/promiseNoData.js';
import useModelProp from "./useModelProp"
import usePromise from "./usePromise"


function Room(props){
    const players = useModelProp(roomModel, "players")
    const [promise, setPromise] = React.useState();

    React.useEffect(()=>
        setPromise(players && roomModel.getPlayers(players)),
        [players]);
    const [data, error]= usePromise(promise);
    return (React.createElement(RoomView,{
            roomName: "hej",
            playerNames: data,
            onExit: () => props.history.push("/home"),
            onStart: () => props.history.push("/quiz")
            }));
}

export default Room;