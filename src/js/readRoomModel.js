import {database} from '../services/firebase.js';
import RoomModel from './roomModel.js';

async function ReadRoomModel(createRoom, roomName) {
    
    let model;
    let roomDataDB = {}; 

    (await getRoomFB(roomName)).forEach((child) => {
        roomDataDB[child.key]= child.val();

    });
    if (createRoom) {
        if (Object.keys(roomDataDB).length !== 0) {
            console.log("A room with the name already exists");
        } else {
            console.log("hellooj")
            model = new RoomModel(roomName);
            await setRoomFB(roomName)

        }
    } else {
        if (Object.keys(roomDataDB).length !== 0) {
            model = new RoomModel(roomName, roomDataDB.players);
            console.log(model.players);
        } else {
            console.log("Room does not exist!");
        }    
    }
    
    syncRoomsFB(model,roomName)
    model.addObserver(()=> updateRoomFB(model, roomName));

    return model;
}
export default ReadRoomModel;


async function getRoomFB(roomName){
    return database.ref('rooms/' + roomName)
    .once('value', (snapshot) => snapshot);
}

async function setRoomFB(roomName){
    database.ref('rooms/' + roomName).set({
        players: "hejhej",
        score: 3000
    });
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
            const values = snapshot.val();
            console.log(values);
        })
    } catch (error) {
        console.log(error);
    }
}
