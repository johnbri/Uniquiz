import PlayersSidebarView from './view/playersSidebarView.js';
import NoDataView from './view/noDataView.js';
import React from "react";
import {roomModel} from '../index.js';
import useModelProp from './useModelProp.js';

function PlayersSidebar (props) {
    /**Sidebar presenter that generates the players in the quiz. 
     * It also shows name, score, profile image and if you're host. */
    const players = useModelProp(roomModel, "players");
    let inRoom = props.location.pathname === "/room";

    return players ? React.createElement(PlayersSidebarView, {
        players: players,
        inRoom: inRoom,
        correctAnswer: window.location == (window.location.origin + "/quiz/answers") && Object.keys(players).map(uid => roomModel.checkCorrectAnswer(players[uid].answer))
        }) : NoDataView("Loading players")
}

export default PlayersSidebar;