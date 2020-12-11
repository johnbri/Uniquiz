import React from "react";
import ResultsView from './view/resultsView.js';
import {roomModel, userModel} from "../index.js";
import useModelProp from "./useModelProp.js"


function Results(props){
    /** Results and the end of a quiz */
    const [roomName, setRoomName ] = useModelProp(roomModel, "roomName");
    //Tänker att det här ska vara fast för även om en spelare lämnar gamet vill man ju ha kvar den i listan. Tänker jag fel?
    const players = roomModel.getPlayers();
    console.log("results", roomModel.players); //Blir en tom lista??
   
    return React.createElement(ResultsView, {
        roomName: roomName,
        players: players,
        onExit: () => props.history.push("/home"),
    });
}
export default Results;