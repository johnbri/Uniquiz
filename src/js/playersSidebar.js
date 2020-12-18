import PlayersSidebarView from './view/playersSidebarView.js';
import NoDataView from './view/noDataView.js';
import React from "react";
import {roomModel} from '../index.js';
import useModelProp from './useModelProp.js';

function PlayersSidebar (props) {
    const players = useModelProp(roomModel, "players");

    let data = [players]

    let inRoom = props.location.pathname === "/room";

    return players ? React.createElement(PlayersSidebarView, {
        players: players,
        inRoom: inRoom,
        }) : NoDataView(data, "Loading for players")
}

export default PlayersSidebar;