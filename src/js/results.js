import React, { useEffect } from "react";
import ResultsView from './view/resultsView.js';
import {roomModel, userModel} from "../index.js";
import useModelProp from "./useModelProp.js"


function Results(props){
    /** Results and the end of a quiz */
    const roomName = useModelProp(roomModel, "roomName");
    console.log("roomname", roomName);
    console.log("results", roomModel.players); //Blir en tom lista??
    //Tänker att det här ska vara fast för även om en spelare lämnar gamet vill man ju ha kvar den i listan. Tänker jag fel?
    const players = useModelProp(roomModel, "players");
    useEffect(() =>  {
        console.log("heeeeeeeeeeej");
    }, []);
   
    return React.createElement(ResultsView, {
        roomName: roomName,
        players: players,
        onExit: () => props.history.push("/home"),
    });
}
export default Results;