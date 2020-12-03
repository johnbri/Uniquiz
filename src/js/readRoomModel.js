import {database} from '../services/firebase.js';
import RoomModel from './roomModel.js';

async function ReadRoomModel(createRoom, roomName) {
    
    let model;
    let roomDataDB; 

    (await getRoomFB(roomName)).forEach((child) => {
        roomDataDB = child.val();
    });
    if (createRoom) {
        if (roomDataDB) {
            console.log("A room with the name already exists");
        } else {
            console.log("hellooj")
            model = new RoomModel(roomName);
            await setRoomFB(roomName);
        }
    } else {
        if (roomDataDB) {
            model = new RoomModel(roomName, roomDataDB.players);
            console.log(model.players);
        } else {
            console.log("Room does nor exist!");
        }    
    }
    
    //model.addObserver(()=> updateRoomFB(roomName));

    return model;
}
export default ReadRoomModel;


async function getRoomFB(roomName){
    return database.ref('rooms/' + roomName)
    .once('value', (snapshot) => snapshot);
}

async function setRoomFB(roomName){
    database.ref('rooms/' + roomName).push({
        players: "hejhej",
        score: 3000
    });
}

   
    /*
    if (createRoom){
        if (getRoomFB(roomName) !== {}) {
            console.log("Name already in use!")
        } else{
            model = new RoomModel(roomName);
            database.ref("rooms/").set({roomName})
        }
    } else{
        if (database.ref("rooms/" + roomName)){
            await getRoomFB(roomName)
        }else{
            console.log("Rooms does not exist!")
        }
    }*/



    /*
  unction getRoomFB(roomName){
    let FBobject={};
    if (database.ref("rooms/" + roomName)){
        database.ref('rooms/' + roomName)
        .on('value', (snapshot) => {
            snapshot.forEach((child) => {
                FBobject[child.key] = child.val() || "";
            })})
    } else{
        console.log("Rooms does not exist!")
    }
    return FBobject;*/