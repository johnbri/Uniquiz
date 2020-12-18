import React from "react";
import ResultsView from './view/resultsView.js';
import {roomModel, resetRoomModel} from "../index.js";
import useModelProp from "./useModelProp.js";
import {removeRoomFB, unSyncRoomModelToFB} from '../services/firebase.js';

function Results(props){
    /** Results and the end of a quiz */
    const roomName = useModelProp(roomModel, "roomName");
    console.log("roomname", roomName);
    console.log("results", roomModel.players);
    const players = useModelProp(roomModel, "players");
    //Tänker att det här ska vara fast för även om en spelare lämnar gamet vill man ju ha kvar den i listan. Tänker jag fel?, Vänta kanske inte är ett problem faktiskt
    
    return React.createElement(ResultsView, {
        roomName: roomName,
        players: players,

        onExit: (roomModel) => {
            removeRoomFB(roomName);
            unSyncRoomModelToFB(roomName);
            resetRoomModel(); //Den finns fortfarande kvar i home
            props.history.push('/home');

        }, //Ta bort currentRoom på User 
    });
}
export default Results;