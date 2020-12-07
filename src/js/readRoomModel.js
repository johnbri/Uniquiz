import React, { useEffect } from 'react';
import {auth, database, syncRoomModelToFB, updateRoomFB} from '../services/firebase.js';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";


function ReadRoomModel() {
    /** Checks for data connected to currentRoom in firebase to put in the room model on refresh  */
    let model = new RoomModel();
    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            let roomName = userModel.currentRoom;
            if(roomName !== "") {
                syncRoomModelToFB(model,roomName);
                model.addObserver(()=> updateRoomFB(model, roomName));
            }
        } else {
            console.log("Not logged in.")
        }

    });

    return model;
}

export {ReadRoomModel, createJoinRoomFB};


function createJoinRoomFB(roomName, createRoom){
    /** Check if given rooms exists in FB to create new or join room to model*/
    let roomDataDB = {}; 
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        if (snapshot.val() !== null) {
            if(createRoom) {
                console.log("A room with the name already exists");
            } else {
                snapshot.forEach((child) => {
                    roomDataDB[child.key]= child.val();
                });
                syncRoomModelToFB(roomModel,roomName);
                roomModel.addObserver(()=> updateRoomFB(roomModel, roomName));
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
                roomModel.addPlayers(userModel.uid);
            }   
        } else {
            if(createRoom) {
                syncRoomModelToFB(roomModel,roomName);
                roomModel.addObserver(()=> updateRoomFB(roomModel, roomName));
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
                roomModel.addPlayers(userModel.uid);
            } else {
                console.log("Room does not exist!");
            }

        }
    });
}