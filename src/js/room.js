import React, { useState } from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel} from "../index.js";
import PromiseNoData from './view/promiseNoData.js';
import useModelProp from "./useModelProp"
import { database } from '../services/firebase.js';
import {getUserPlaylists} from './spotify.js';
import NoDataView from './view/noDataView.js';
import {addPlaylistToFB} from '../services/firebase.js';

function Room(props){
    const combinedPlaylist = useModelProp(roomModel, "playlist");
    const creator = useModelProp(roomModel, "creator");
    const roomName = useModelProp(roomModel, "roomName");
    const [started, setStarted] = useState(false); // boolean som visar om man klickat på start
    const data = [combinedPlaylist];
    console.log("combiendplaylist: ");
    console.log(combinedPlaylist);
    if (combinedPlaylist !== null) {
        props.history.push('/quizPlaying')
    }
    return started ? NoDataView(data) // om man inte klickat på start så renderas vanliga viewn, annars renderas NoDataView tills .then nedan anropas när combined playlist är klart
    : React.createElement(RoomView,{
            creator: creator,
            roomName: roomName,
            playerNames: userModel.players,
            onExit: () => props.history.push("/home"),
            onStart: () => {
                if (creator) {
                    const playersuid = roomModel.getPlayersUid();
                    let playlist = quizPlaylist(playersuid);
                    playlist.then((tracks) => addPlaylistToFB(tracks, roomName));
                    //.then(() => props.history.push('/quizPlaying'));
                }
                setStarted(true);
            }
            });
}

async function quizPlaylist (arrayuid) {
    let combinedPlaylist = [];

    for (let i = 0; i < arrayuid.length; i++) {
        let token = (await getUserToken(arrayuid[i])).val(); // hämtar ut token
        let userPlaylist = await getUserPlaylists(token);
        combinedPlaylist.push(userPlaylist); // lägger till i den stora playlisten med alla användares låtar
    }
    combinedPlaylist = combinedPlaylist.flat();
    let combinedPlaylistUnique = [];
    let i = 0;
    do {
        let trackThreshold = arrayuid.length - i; // används för att sänka kravet om att alla users ska ha låtarna i playlists
        let combinedPlaylistForReduce = combinedPlaylist; // gör detta här för o undvika varning att det är unsafe use of references/variables

        combinedPlaylistUnique = combinedPlaylistForReduce.reduce((acc, currentTrack) => {
                if (combinedPlaylistForReduce.filter(track => track[1] === currentTrack[1]).length === trackThreshold) { // om tracket finns lika många gånger som det finns spelare (dvs. alla har låten i någon av sina listor)
                    combinedPlaylistForReduce = combinedPlaylistForReduce.filter(track => track[1] !== currentTrack[1]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
                    return ([...acc, currentTrack]); // och lägger till den till accumulatorn
                }
                else {
                    return acc; // annars gör vi ingenting och returnerar accumulatorn
                }
            }, []);
            i++
        }
    while (combinedPlaylistUnique.length < 11 && i < arrayuid.length);
    
    const combinedPlaylistUniqueDict = listWithObj(combinedPlaylistUnique); // gör om listan till objekt
    console.log("Added playlist to roommodel");
    return combinedPlaylistUniqueDict.slice(0,10);
    //roomModel.setPlaylist(combinedPlaylistUniqueDict);
}
async function getUserToken (uid) {
    return database.ref('users/' + uid + '/token').once('value', (snapshot) => { 
        console.log("Successfully received token")
    });
}

function listWithObj (list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList[i] = {name: list[i][0], url: list[i][2]};
    }
    return newList;
}
//const arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2"];
//quizPlaylist(arrayuid);

export default Room;