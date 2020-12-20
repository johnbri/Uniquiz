import React from "react";
import ResultsView from './view/resultsView.js';
import {roomModel, resetRoomModel} from "../index.js";
import useModelProp from "./useModelProp.js";
import {removeRoomFB, unSyncRoomModelToFB} from '../services/firebase.js';
import { Redirect } from "react-router";

function Results(props){
    /** Results and the end of a quiz */
    const roomName = useModelProp(roomModel, "roomName");
    const players = useModelProp(roomModel, "players");
    
    roomModel.playlist.length === 0 && props.history.push('/home')
    
    return roomModel.playlist.length === 0 ? <Redirect to="/home"/> 
            : React.createElement(ResultsView, {
            roomName: roomName,
            players: players,
            playlist: roomModel.playlist,
            onExit: () => {
                    unSyncRoomModelToFB(roomName);
                    removeRoomFB(roomName);
                    resetRoomModel();
                    props.history.push('/home');
                }
        });
}

export default Results;