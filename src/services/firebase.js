import firebase from 'firebase/app';
import 'firebase/database';
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
  }).catch((error) => { 
    props.history.push({
      pathname: '/',
      errorMessage: "Invalid email or password."
    })
  });
}

function signupFB(props, email, name, password) {
  /**signs up the user in firebase*/
    return auth().createUserWithEmailAndPassword(email, password)
    .then(userRecord => console.log("Successfully created new user"))
    .then(() =>  {
      database.ref('users/' + auth().currentUser.uid).set({
      displayName: name
      })
    }).catch((error) => {
      props.history.push({
        pathname: '/signup',
        errorMessage: error.code.includes("weak-password") ? "Password has to be at least 6 characters" :
                      error.code.includes("email-already-in-use") ? "Email is already in use." :
                      error.code.includes("invalid-email") ? "Invald email" : "Unexpected error. Please try again."
      })

    });
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
      })

      ref.child("status").on('value', (snapshot) => {
        roomModel.setStatus(snapshot.val())
      })

      ref.child("time").on('value', (snapshot) => {
        roomModel.setTime(snapshot.val())
      })

      ref.child("tracks").on('value', (snapshot) => {
        roomModel.setNumberOfTracks(snapshot.val())
      })

      ref.child("currentSongIndex").on('value', (snapshot) => {
        roomModel.setCurrentSongIndex(snapshot.val());
      })

  } catch (error) {
      console.log("Unable to correctly sync RoomModel to FB");
  }
}

function syncUserModelToFB(uid){
  /** Syncs the model on firebase updates */
  try {
      let ref = database.ref('users/' + uid);
      
      ref.child("playlist").on('value', (snapshot) => { 
        userModel.setPlaylist(snapshot.val()) 
      })

  } catch (error) {
      console.log(error);
  }
}

async function createJoinRoomFB(props, roomName, createRoom){
  database.ref('rooms/' + roomName).once('value', (snapshot) => {
      try {
      if (snapshot.val() !== null && createRoom) { //If room exist and user wants to create
              throw new Error("A room with the name already exists");
      } else if (snapshot.val() !== null && !createRoom) { //If room exist and user wants to join
          syncRoomModelToFB(roomName);
          addPlayerToFB(roomName);
          roomModel.setRoomName(roomName);
          setTimeFB(15);
          setNumberOfTracksFB(10);
          /*roomModel.setRoomName(roomName);
          userModel.setCurrentRoom(roomName);
          roomModel.addPlayers(userModel.uid); */
      } else if (snapshot.val() == null && createRoom){ //If room does not exist and user wants to create
          syncRoomModelToFB(roomName);
          addPlayerToFB(roomName);
          roomModel.setRoomName(roomName);
          roomModel.setCreator(true);
          setTimeFB(15);
          setNumberOfTracksFB(10);
          /*roomModel.addPlayers(userModel.uid);
          roomModel.setRoomName(roomName);
          userModel.setCurrentRoom(roomName);*/
      } else { //If room does not exist and user wants to join
              throw new Error("Room does not exist!");
      }
  } catch(error) {
      error.message.includes("already exists") ? props.history.push({
        pathname: '/createJoin',
        createRoom: true,
        errorMessage: error.message
      }) : props.history.push({
        pathname: '/createJoin',
        createRoom: false,
        errorMessage: error.message
      })
  }
  });
}


function addPlayerToFB(roomName) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName + '/players').child(userModel.uid);
  ref.update({
    displayName: userModel.displayName,
    profileImg: userModel.img,
    score: 0,
    answer: "",
    playlist: userModel.playlist
  });
}

function addRoomPlaylistToFB(playlist, roomName) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName);
  ref.update({
    playlist
  });
}

function addUserPlaylistToFB(playlist) {
  /** creates a playerObject for player in room in firebase*/
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        playlist
      }).then( res => console.log("successfully added playlist to user in database")).catch(console.log("Error adding token to firebase DB"));
    } else {
      console.log("There is no user logged in");
    }
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

function clearPlayerAnswersFB() {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/players/' + userModel.uid + '/answer');
  ref.set("");
}

function setQuizStatusFB(status) {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/status');
  ref.set(status);
}

function setCurrentSongIndexFB(started) {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/currentSongIndex');
  ref.set(roomModel.getCurrentSongIndex()+1);
}

function setTimeFB(time) {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/time');
  ref.set(time);
}

function setNumberOfTracksFB(tracks) {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/tracks');
  ref.set(tracks);
}

function removeUserFromRoomFB() {
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/players/' + userModel.uid);
  ref.set(null);
}

export {database, auth, loginFB, signupFB, syncRoomModelToFB, syncUserModelToFB, addPlayerToFB, 
  addRoomPlaylistToFB, setNumberOfTracksFB, setPlayerAnswerFB, setPlayerScoreFB, setQuizStatusFB, setTimeFB, setCurrentSongIndexFB, addUserPlaylistToFB, 
  clearPlayerAnswersFB, removeUserFromRoomFB, createJoinRoomFB
};
