import {database, auth} from '../services/firebase.js';
import UserModel from './userModel.js';
import { Route } from "react-router-dom";
import Login from "./login.js";



import {syncUserModelToFB} from '../services/firebase.js';
function ReadUserModel() {
    /** Checks for data connected to logged in user in firebase to put in the user model on refresh  */
    let dbDataObject = {}; 
    let model = new UserModel();
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
            model = new UserModel();
            console.log("User not logged in");
            (window.location.pathname !== "/") && (window.location.pathname = "/"); 
        }        
    });  
    return model;
}

export default ReadUserModel;