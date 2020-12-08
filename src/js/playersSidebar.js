import PlayersSidebarView from './view/playersSidebarView.js';
import React, { useState, useEffect} from "react";
import {roomModel, userModel} from '../index.js';
import useModelProp from './useModelProp.js';


function PlayersSidebar (props) {
    const players = useModelProp(roomModel, "players");
    /* const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const userImg = useModelProp(userModel, "img"); */
    
    return React.createElement(PlayersSidebarView, {
        players: players
        });
}

export default PlayersSidebar;