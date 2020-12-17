import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {roomModel, userModel, resetRoomModel} from '../index.js';
import { getUserImg } from "../js/spotify";


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
    if (name) {
     auth().createUserWithEmailAndPassword(email, password)
    .then(() =>  {
        database.ref('users/' + auth().currentUser.uid).set({
          displayName: name
        })   
    }).then(() => {props.history.push("/spotifyConnect")}).catch((error) => props.history.push({
      pathname: "/signup",
      errorMessage: error.message
    }) ) 
    } else {
      props.history.push({
        pathname: "/signup",
        errorMessage: "Invalid display name."
    }) }
}

function syncRoomModelToFB(roomName){
  /** Syncs the model on firebase updates */
  try {
      let ref = database.ref('rooms/' + roomName);
      ref.child("players").on('value', (snapshot) => { 
        roomModel.setPlayers(snapshot.val());
        roomModel.setCreator(roomModel.getPlayerInfo().host);

        if (roomModel.creator) {
          let nextCreator = Object.keys(roomModel.players).find(uid => userModel.uid !== uid);
          nextCreator && ref.child("players").child(nextCreator).onDisconnect().update({host: true});
        }
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

      ref.child("inRoom").on('value', (snapshot) => {
        userModel.setInRoom(snapshot.val());
      });
      ref.child("playlist").on('value', (snapshot) => { 
        userModel.setPlaylist(snapshot.val()) 
      });

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
          addPlayerToFB(roomName, createRoom);
          setUserRoomStatusToFB(true);
          roomModel.setRoomName(roomName);
          setTimeFB(15);
          setNumberOfTracksFB(10);
          props.history.push('/quiz/room')
      } else if (snapshot.val() == null && createRoom){ //If room does not exist and user wants to create
          syncRoomModelToFB(roomName);
          addPlayerToFB(roomName, createRoom);
          setUserRoomStatusToFB(true);
          roomModel.setRoomName(roomName);
          roomModel.setCreator(true);
          setTimeFB(15);
          setNumberOfTracksFB(10);
          props.history.push('/quiz/room')
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

function addPlayerToFB(roomName, createRoom) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName + '/players');
  ref.child(userModel.uid).update({
    displayName: userModel.displayName,
    profileImg: userModel.img,
    score: 0,
    answer: "",
    playlist: userModel.playlist,
    host: createRoom
  });
  ref.child(userModel.uid).onDisconnect().remove(); // removes player from room on disconnect
}

function setUserRoomStatusToFB(inRoom) {
  /** Adds if user is in a room*/
  let ref = database.ref('users/' + userModel.uid);
  ref.update({
    inRoom: inRoom
  }); // removes player from room on disconnect
}

function addRoomPlaylistToFB(playlist, roomName) {
  /** creates a playerObject for player in room in firebase*/
  let ref = database.ref('rooms/' + roomName);
  ref.update({
    playlist
  });
}

async function addImgDB(token) {
  let imgURL = await getUserImg(token);
  userModel.setImg(imgURL);
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        token: token,
        img: imgURL
      })
    }
  });
}

function addTokenDB(token) {
  /** Add token retrieved from spotify to firebase */
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        token: token
      })
    }
  });
}
function addUserPlaylistToFB(playlist) {
  /** creates a playerObject for player in room in firebase*/
  auth().onAuthStateChanged(function(userObj) {
    if (userObj) {
      let user = auth().currentUser;
      database.ref('users/' + user.uid).update({
        playlist
      })
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

function removeAnswerFB() {
  /** Removes answer from all players in room */
  let ref = database.ref('rooms/' + roomModel.getRoomName() + '/players/' + userModel.uid + '/answer')
  ref.set("")
}

function removeUserFromRoomFB() {
  /** Stops syncing roommodel, removes the user from room and assigns a new host if needed */
  let ref = database.ref('rooms/' + roomModel.roomName);
  stopSyncRoomModelToFB();
  if (roomModel.creator) {
    let nextCreator = Object.keys(roomModel.players).find(uid => userModel.uid !== uid);
    nextCreator && ref.child("players").child(nextCreator).update({host: true});
  }
  ref.child("players").child(userModel.uid).remove().then(resetRoomModel());
}

function stopSyncRoomModelToFB() {
  let ref = database.ref('rooms/' + roomModel.roomName);
  ref.child("players").off(); // stops syncing room
  ref.child("playlist").off();
  ref.child("status").off();
  ref.child("time").off();
  ref.child("currentSongIndex").off();
}

export {database, auth, loginFB, signupFB, syncRoomModelToFB, syncUserModelToFB, addPlayerToFB,
  addRoomPlaylistToFB, setPlayerAnswerFB, setPlayerScoreFB, setQuizStatusFB, setTimeFB, setCurrentSongIndexFB, addUserPlaylistToFB, 
  removeUserFromRoomFB, createJoinRoomFB, setUserRoomStatusToFB, setNumberOfTracksFB, addImgDB, addTokenDB, removeAnswerFB
};
