import {auth, database} from '../services/firebase.js';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";


function ReadRoomModel() {
    let model = new RoomModel();
    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            let roomName = userModel.currentRoom;
            if(roomName != "") {
                syncRoomsFB(model,roomName);
                model.addObserver(()=> updateRoomFB(model, roomName));
            }
        } else {
            console.log("Not logged in.")
        }

    });

    return model;
}

export {ReadRoomModel, getRoomFB};


function getRoomFB(roomName, createRoom){
    //Kan den här ha await? 
    let roomDataDB = {}; 
    console.log("name",roomName);
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        console.log("fd", snapshot.val());
        if (snapshot.val() != null) {
            if(createRoom) {
                console.log("A room with the name already exists");
            } else {
                snapshot.forEach((child) => {
                    console.log("hehe", child);
                    roomDataDB[child.key]= child.val();
                });
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
            }   
        } else {
            if(createRoom) {
                console.log("create");
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
                console.log("roomname", roomModel.roomName)
            } else {
                console.log("Room does not exist!");
            }

        }/*
        snapshot.forEach((child) => {
            roomDataDB[child.key]= child.val();
            console.log("c", child);
            if (createRoom) {
                if (Object.keys(roomDataDB).length !== 0) {
                    console.log("A room with the name already exists");
                } else {
                    roomModel.setRoomName(roomName);
                    userModel.setCurrentRoom(roomName);
                }
            } else {
                if (Object.keys(roomDataDB).length !== 0) {
                    roomModel.setRoomName(roomName, roomDataDB.players);
                    userModel.setCurrentRoom(roomName);
                    console.log(userModel.players);
                } else {
                    console.log("Room does not exist!");
                }       
            }
        });*/
    });
}

function updateRoomFB(model, roomName){
    database.ref('rooms/' + roomName).update({
        "players": model.players
    })
}

function syncRoomsFB(model, roomName){
    try {
        database.ref('rooms/' + roomName)
        .on('value', (snapshot) => { 
            snapshot.forEach((player) => {
                model.setPlayers(player.val());  
                console.log(model.players);
            })
        })
    } catch (error) {
        console.log(error);
    }
}
