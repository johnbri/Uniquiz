import React, { useEffect, useState } from "react";
import RoomView from "./view/roomView";
import PlayersSidebarView from "./view/playersSidebarView";


function Room(props){
    return React.createElement(RoomView,{
        roomName: "hej",
        playerNames: "hej",
        onExit: () => props.history.push("/home"),
        onStart: () => props.history.push("/quiz")
    });
}


export default Room;