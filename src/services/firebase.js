import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/auth';
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
  }).catch((error) => error.code + error.message);
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
      
      ref.child("players").on('value', (snapshot) => { 
        roomModel.setPlayers(snapshot.val()) 
      })

      ref.child("playlist").on('value', (snapshot) => {
        roomModel.setPlaylist(snapshot.val())
        console.log(snapshot.val())
        console.log(roomModel.playlist)
      })
      
      /*  let ref = database.ref('rooms/' + roomName);
      ref.on('value', (snapshot) => { 
          roomModel.setPlaylist(snapshot.child("playlist").val());
          roomModel.setPlayers(snapshot.child("players").val());
          console.log(roomModel.players)
          console.log(roomModel.getPlayerInfo())
          snapshot.child("players").forEach((player) => {
            let playerObj = {};
            playerObj = player.val();
            playerObj.uid = player.key;
              roomModel.addPlayers(
                playerObj
              );
          })*/
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
    answer: ""
  });
}

function addPlaylistToFB(playlist, roomName) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName);
  ref.update({
    playlist
  });
}

function setPlayerAnswerFB(answer) {
  /** Sets the players answer in Firebase */
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/players/' + userModel.uid + '/answer');
  ref.set(answer);
}

function setPlayerScoreFB() {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/players/' + userModel.uid + '/score');
  ref.set(roomModel.getPlayerInfo().score+1);
  
}
export {database, auth, loginFB, signupFB, syncRoomModelToFB, addPlayerToFB, addPlaylistToFB, setPlayerAnswerFB, setPlayerScoreFB};

