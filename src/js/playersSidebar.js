import PlayersSidebarView from './view/playersSidebarView.js';
import NoDataView from './view/noDataView.js';
import React, { useState, useEffect, useReducer} from "react";
import {roomModel, userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import { useHistory } from "react-router-dom";

function PlayersSidebar (props) {
    const players = useModelProp(roomModel, "players");
    let data = [players]
    /* const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const userImg = useModelProp(userModel, "img"); */

    let inRoom = props.location.pathname === "/room";

    return players ? React.createElement(PlayersSidebarView, {
        players: players,
        inRoom: inRoom
        }) : NoDataView(data, "Loading for players")
}

export default PlayersSidebar;