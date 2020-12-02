import {database} from '../services/firebase.js';
import RoomModel from './roomModel.js';

async function ReadRoomModel(createRoom, roomName) {
    
    let model;
    let dbDataObject = {}; 
    if (createRoom){
        let room = (await getRoomFB(roomName)).forEach((child) => {
            dbDataObject[child.key] = child.val()})
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

    model.addObserver(()=> {
        database.ref("rooms/" + roomName).update(
            {"players": model.players})
        })

    return "HEJ";
}
export default ReadRoomModel;


async function getRoomFB(roomName){
    return database.ref('rooms/' + roomName)
    .once('value', (snapshot) => snapshot);
}


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