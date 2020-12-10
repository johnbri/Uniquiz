import PlayersSidebarView from './view/playersSidebarView.js';
import React, { useState, useEffect, useReducer} from "react";
import {roomModel, userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import { useHistory } from "react-router-dom";

function PlayersSidebar (props) {
    const players = useModelProp(roomModel, "players");
    /* const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const userImg = useModelProp(userModel, "img"); */

    let inRoom = props.location.pathname === "/room";
    return React.createElement(PlayersSidebarView, {
        players: players,
        inRoom: inRoom
        });
}

export default PlayersSidebar;