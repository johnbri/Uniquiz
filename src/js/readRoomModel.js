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


<<<<<<< HEAD
async function createJoinRoomFB(roomName, createRoom){
=======
function createJoinRoomFB(roomName, createRoom){
    /** Check if given rooms exists in FB to create new or join room to model*/
    let roomDataDB = {}; 
>>>>>>> 57e244c924db974c27c4df1e9476033a96e41c40
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        if (snapshot.val() !== null && createRoom) { //If room exist and user wants to create
                console.log("A room with the name already exists");
<<<<<<< HEAD
        } else if (snapshot.val() !== null && !createRoom) { //If room exist and user wants to join
            syncRoomsFB(roomModel,roomName);
            roomModel.setRoomName(roomName);
            userModel.setCurrentRoom(roomName);
            roomModel.addPlayers(userModel.uid); 
        } else if (snapshot.val() == null && createRoom){ //If room does not exist and user wants to create
            syncRoomsFB(roomModel,roomName);
            roomModel.setRoomName(roomName);
            userModel.setCurrentRoom(roomName);
            roomModel.addPlayers(userModel.uid);
            updateRoomFB(roomModel, roomName);
        } else { //If room does not exist and user wants to join
=======
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
>>>>>>> 57e244c924db974c27c4df1e9476033a96e41c40
                console.log("Room does not exist!");
        }
    });
}
<<<<<<< HEAD

function updateRoomFB(model, roomName){
    database.ref('rooms/' + roomName).update({
        players: model.players
    })
}

function syncRoomsFB(model, roomName){
    try {
        database.ref('rooms/' + roomName)
        .on('value', (snapshot) => { 
            snapshot.forEach((player) => {
                model.addPlayers(player.val());  
                console.log(model.players);
            })
        })
    } catch (error) {
        console.log(error);
    }
}
=======
>>>>>>> 57e244c924db974c27c4df1e9476033a96e41c40
