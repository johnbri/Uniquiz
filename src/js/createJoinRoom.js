import React from "react";
import {userModel} from "../index.js";
import { CreateJoinRoomView }from './view/createJoinRoomView';
import {createJoinRoomFB} from "../services/firebase.js";
import {auth} from '../services/firebase.js';
import useModelProp from "./useModelProp"
import NoDataView from './view/noDataView.js';


function CreateJoinRoom(props){
    /** Create different view depending on if the user want to create or join room */
    const [roomName, setRoomName]= React.useState("");
    const [playlistReady, setPlaylistReady]= React.useState(true);
    const playlist = useModelProp(userModel, "playlist");
    const data = [userModel.playlist];
    let createRoom = props.location.createRoom;
    
    return playlistReady ? React.createElement(CreateJoinRoomView, {
        title: createRoom ? "Create" : "Join",
        onSubmit: () => {
            playlist ? createJoin(props, roomName, createRoom) : setPlaylistReady(false);
        },
        onText: name => setRoomName(name),
        onBack: () => props.history.push("/home"),
        onLogOut: () => {
            auth().signOut().then(()=> {
                props.history.push('/')})
            },
        errorMessage: props.location.errorMessage
    })
    : NoDataView(data) || createJoin(props, roomName, createRoom);
    ;
}

function createJoin (props, roomName, createRoom) {
    createJoinRoomFB(props, roomName, createRoom);
    props.history.push('/quiz/room');
    return null;
}
export default CreateJoinRoom;