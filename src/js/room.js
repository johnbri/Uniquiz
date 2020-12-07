import React from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel} from "../index.js";
import PromiseNoData from './view/promiseNoData.js';


function Room(props){
    const[roomModel, setRoomModel] = React.useState("")
    
    console.log(roomModel)

    return "hej"/*(React.Fragment, {}
        , (RoomView,{
            roomName: "hej",
            playerNames: "hej",
            onExit: () => props.history.push("/home"),
            onStart: () => props.history.push("/quiz")
            })
            PromiseNoData(promise, data, error) ||
                h(PlayersSidebarView,{
                    hej: "hej"
                    })*/          
    
}

export default Room;

/*
function Search({model, dishChoice}){
    const [type, setType]= React.useState(""); 
    const [query, setQuery]= React.useState("");

    const [promise, setPromise]= React.useState(null);
    React.useEffect(()=>setPromise(DishSource.searchDishes({})),
    []);
    
    const [data, error]= usePromise(promise);

    */