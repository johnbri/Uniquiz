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

export {ReadRoomModel};

