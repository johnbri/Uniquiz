import {database, auth} from '../services/firebase.js';
import UserModel from './userModel.js';

import {syncUserModelToFB} from '../services/firebase.js';
function ReadUserModel() {
    /** Checks for data connected to logged in user in firebase to put in the user model on refresh  */
    let dbDataObject = {}; 
    const model = new UserModel();
    auth().onAuthStateChanged((userObject) => {
        if(userObject) {
            dbDataObject["uid"] = userObject.uid;
            database.ref('users/' + auth().currentUser.uid).once('value', (snapshot) => { 
                snapshot.forEach((child) => {
                    dbDataObject[child.key] = child.val() || "";
                });
                console.log("setting playlist in model");
                syncUserModelToFB(dbDataObject.uid);
                if (dbDataObject.playlist) { // behövs detta?
                    model.setPlaylist(dbDataObject.playlist);
                }
                model.setUid(dbDataObject.uid);
                model.setDisplayName(dbDataObject.displayName);
                model.setToken(dbDataObject.token);
                model.setCurrentRoom(dbDataObject.currentRoom);
                model.setImg(dbDataObject.img);
            });    
        } else {
            console.log("User not logged in");
        }        
    });  
    return model;
}

export default ReadUserModel;