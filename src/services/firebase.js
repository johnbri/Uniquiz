import firebase from 'firebase';
import {roomModel, userModel } from '../index.js';

  var firebaseConfig = {
    apiKey: "AIzaSyALuzAm03buerT-oxeALHaQ37KJ3-mlWwU",
    authDomain: "uniquiz-e9d1f.firebaseapp.com",
    databaseURL: "https://uniquiz-e9d1f.firebaseio.com/",
    projectId: "uniquiz-e9d1f",
    storageBucket: "uniquiz-e9d1f.appspot.com",
    messagingSenderId: "686495982031",
    appId: "1:686495982031:web:d547762be1611f7d42b2ba",
    measurementId: "G-XQ99NH3C47"
  };
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const auth = firebase.auth;

//Functions
function loginFB (props, email, password) {
  /**Log in to a user in firebase*/
  auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    props.history.push("/spotifyConnect");
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function signupFB(email, name, password) {
  /**signs up the user in firebase*/
    return auth().createUserWithEmailAndPassword(email, password)
    .then(userRecord => console.log("Successfully created new user"))
    .then(() =>  {
      database.ref('users/' + auth().currentUser.uid).set({
      displayName: name
      })
    }).catch((er) => console.log("Error i firebase: " + er));
}

function syncRoomModelToFB(roomName){
  /** Syncs the model on firebase updates */
  try {
      let ref = database.ref('rooms/' + roomName);
      ref.on('value', (snapshot) => { 
          snapshot.child("players").forEach((player) => {
<<<<<<< HEAD
              roomModel.addPlayers(player.key);  
              
=======
            //let key = player.key;
            //var childKey = player.val()
            let playerObj = {};
            playerObj[player.key] = player.val();
              roomModel.addPlayers(
                playerObj
              );  
              console.log("player: " + player);
              console.log("i modellen", roomModel.players);
>>>>>>> 28e43b3d93dd4edaa6f4f753c9c32953fc496ef1
          })
      })
  } catch (error) {
      console.log(error);
  }
}

function addPlayerToFB(roomName) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName + '/players').child(userModel.uid);
  ref.update({
    displayName: userModel.displayName,
    profileImg: userModel.img,
    score: 0,
    answer: "",
    displayName: userModel.displayName,
    profileImg: userModel.img
  });
}


function updateRoomFB(roomName){
  /** Update firebase with room model info*/
  let playersref = database.ref('rooms/' + roomName).add("players");
  playersref.transaction( (currentPlayers) => {
      return roomModel.players
  });
}


export {database, auth, loginFB, signupFB, syncRoomModelToFB, updateRoomFB, addPlayerToFB};