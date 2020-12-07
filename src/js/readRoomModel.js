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


async function createJoinRoomFB(roomName, createRoom){
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        if (snapshot.val() !== null && createRoom) { //If room exist and user wants to create
                console.log("A room with the name already exists");
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
                console.log("Room does not exist!");
        }
    });
}
function updateRoomFB(model, roomName){
    console.log(model.players)
    database.ref('rooms/' + roomName).update({
        players: model.players
    })}
}

function syncRoomsFB(model, roomName){
    try {
        database.ref('rooms/' + roomName)
        .on('value', (snapshot) => { 
            snapshot.forEach((player) => {
                model.addPlayers(player.val());  
                console.log(model.players);
                model.addPlayers(player.val());  
                console.log(model.players);
                
            }); updateRoomFB(model,roomName)
        })
    } catch (error) {
        console.log(error);
    }
}
