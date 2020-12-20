import {database, auth} from '../services/firebase.js';
import UserModel from './userModel.js';
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
                syncUserModelToFB(dbDataObject.uid);
                if (dbDataObject.playlist) {
                    model.setPlaylist(dbDataObject.playlist);
                }
                model.setUid(dbDataObject.uid);
                model.setDisplayName(dbDataObject.displayName);
                model.setToken(dbDataObject.token);
                model.setImg(dbDataObject.img);

                dbDataObject.inRoom ? model.setInRoom(true) : model.setInRoom(false);
                model.setLoggedIn(true);
            });    
        } else {
            model = new UserModel();
            model.setLoggedIn(false);
            console.log("User not logged in");
        }        
    });  
    return model;
}

export default ReadUserModel;