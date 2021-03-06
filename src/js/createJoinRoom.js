import React from "react";
import {userModel} from "../index.js";
import { CreateJoinRoomView }from './view/createJoinRoomView';
import {createJoinRoomFB} from "../services/firebase.js";
import {auth} from '../services/firebase.js';
import useModelProp from "./useModelProp"
import NoDataView from './view/noDataView.js';


function CreateJoinRoom(props){
    /** Presenter that creates different views depending on if the user want to create or join a quiz */
    const [roomName, setRoomName]= React.useState("");
    const [playlistReady, setPlaylistReady]= React.useState(true);
    const playlist = useModelProp(userModel, "playlist");
    const createRoom = window.location == window.location.origin + '/quiz/create'; 

    return playlistReady ? React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {
            playlist ? createJoinRoomFB(props, roomName, createRoom)
            : setPlaylistReady(false) 
        },
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home"),
        onLogOut: () => {
                    auth().signOut().then(()=> {
                    props.history.push('/')})
                },
        errorMessage: props.location.errorMessage
        })
    : NoDataView("Loading")
}

export default CreateJoinRoom;