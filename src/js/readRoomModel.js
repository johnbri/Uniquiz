import {auth, database, syncRoomModelToFB, addPlayerToFB, setPlayerAnswerFB} from '../services/firebase.js';
import RoomModel from './roomModel.js';
import {roomModel, userModel} from "../index.js";




function ReadRoomModel(props) {
    let model = new RoomModel();
    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            let roomName = userModel.currentRoom;
            if(roomName !== "") {
                /*syncRoomsFB(model,roomName);
                model.addObserver(()=> updateRoomFB(model, roomName));*/
            } 
        } else {
            console.log("User is not logged in, not joined in any room")
        }
    });
    return model;
}

export {ReadRoomModel, createJoinRoomFB};


async function createJoinRoomFB(roomName, createRoom){
    database.ref('rooms/' + roomName).once('value', (snapshot) => {
        try {
        if (snapshot.val() !== null && createRoom) { //If room exist and user wants to create
                throw "A room with the name already exists XDD";
        } else if (snapshot.val() !== null && !createRoom) { //If room exist and user wants to join
            syncRoomModelToFB(roomName);
            addPlayerToFB(roomName);
            roomModel.setRoomName(roomName);
            /*roomModel.setRoomName(roomName);
            userModel.setCurrentRoom(roomName);
            roomModel.addPlayers(userModel.uid); */
        } else if (snapshot.val() == null && createRoom){ //If room does not exist and user wants to create
            syncRoomModelToFB(roomName);
            addPlayerToFB(roomName);
            roomModel.setRoomName(roomName);
            roomModel.setCreator(true);
            /*roomModel.addPlayers(userModel.uid);
            roomModel.setRoomName(roomName);
            userModel.setCurrentRoom(roomName);*/
        } else { //If room does not exist and user wants to join
                console.log("Room does not exist!");
        }
    } catch(error) {
        console.log(error)
    }
    });
}
