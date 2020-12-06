import React from "react";
import { RoomView } from "./view/roomView";
import CreateJoinRoom from "./createJoinRoom";
import PromiseNoData from './view/promiseNoData.js';


function Room(props){

    return (React.Fragment, {}
        , (RoomView,{
            roomName: "hej",
            playerNames: "hej",
            onExit: () => props.history.push("/home"),
            onStart: () => props.history.push("/quiz")
            })/*
            PromiseNoData(promise, data, error) ||
                h(PlayersSidebarView,{
                    hej: "hej"
                    })*/          
    )
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