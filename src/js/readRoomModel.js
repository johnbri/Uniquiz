import {database} from '../services/firebase.js';
import RoomModel from './roomModel.js';

async function ReadRoomModel(createRoom, roomName) {
    
    let model;
    let roomDataDB = {}; 

    (await getRoomFB(roomName)).forEach((child) => {
        roomDataDB[child.key]= child.val()})

    if (createRoom) {
        if (Object.keys(roomDataDB).length !== 0) {
            console.log("A room with the name already exists");
        } else {
            model = new RoomModel(roomName);
        }
    } else {
        if (Object.keys(roomDataDB).length !== 0) {
            model = new RoomModel(roomName, roomDataDB.players);
            console.log(model.players);
        } else {
            console.log("Room does not exist!");
        }    
    }

    console.log(roomDataDB)

    syncRoomsFB(model,roomName)
    model.addObserver(()=> updateRoomFB(model, roomName));

    return model;
}
export default ReadRoomModel;


async function getRoomFB(roomName){
    return database.ref('rooms/' + roomName)
    .once('value', (snapshot) => snapshot);
}

async function updateRoomFB(model, roomName){
    database.ref('rooms/' + roomName).update({
        "players": model.players
    })
}

function syncRoomsFB(model, roomName){
    try {
        database.ref('rooms/' + roomName)
        .on('value', (snapshot) => { 
            snapshot.forEach((player) => {
                model.setPlayers(player.val())  
            })
        })
    } catch (error) {
        console.log(error);
    }
}
