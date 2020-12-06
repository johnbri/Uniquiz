import {auth, database} from '../services/firebase.js';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";


function ReadRoomModel() {
    let model = new RoomModel();
    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            let roomName = userModel.currentRoom;
            if(roomName !== "") {
                syncRoomsFB(model,roomName);
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
    let roomDataDB = {}; 
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        if (snapshot.val() !== null) {
            if(createRoom) {
                console.log("A room with the name already exists");
            } else {
                snapshot.forEach((child) => {
                    roomDataDB[child.key]= child.val();
                });
                syncRoomsFB(roomModel,roomName);
                
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
                roomModel.addPlayers(userModel.uid);
            }   
        } else {
            if(createRoom) {
                syncRoomsFB(roomModel,roomName);
                roomModel.setRoomName(roomName);
                userModel.setCurrentRoom(roomName);
                roomModel.addPlayers(userModel.uid);
            } else {
                console.log("Room does not exist!");
            }
        }
    });
}

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
                model.setPlayers(player.val());  
                console.log(model.players);
            })
        })
        model.addObserver(()=> updateRoomFB(roomModel, roomName))
    } catch (error) {
        console.log(error);
    }
}
