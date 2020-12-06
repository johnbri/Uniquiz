import {database, auth} from '../services/firebase.js';
import UserModel from './userModel.js';

function ReadUserModel() {
    let dbDataObject = {}; 
    const model = new UserModel();
    auth().onAuthStateChanged((userObject)=> {
        if(userObject) {
            dbDataObject["uid"] = userObject.uid;
            database.ref('users/' + auth().currentUser.uid).once('value', (snapshot) => { 
                snapshot.forEach((child) => {
                    dbDataObject[child.key] = child.val() || "";
                });
                model.setUid(dbDataObject.uid);
                model.setDisplayName(dbDataObject.displayName);
                model.setToken(dbDataObject.token);
            });    
        } else {
            console.log("User not logged in");
        }        
    });
    //console.log("HEJ", model);
    /*const modelString = localStorage.getItem("dinnerModel");
    let modelObject = modelString && JSON.parse(modelString) || {} ;
    const model = new DinnerModel(modelObject.guests, modelObject.dishes, modelObject.currentDish);
    model.addObserver(() => localStorage.setItem("dinnerModel",JSON.stringify({
        guests: model.getNumberOfGuests(), 
        dishes: model.getMenu(),
        currentDish: model.getCurrentDish()
    })));*/
    
    return model;
}

export default ReadUserModel;