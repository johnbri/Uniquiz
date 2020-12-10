import React, { useState } from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel} from "../index.js";
import PromiseNoData from './view/promiseNoData.js';
import useModelProp from "./useModelProp"
import {getUserPlaylists} from './spotify.js';
import NoDataView from './view/noDataView.js';
import {database, addPlaylistToFB, setStartedFB, setCurrentSongIndexFB} from '../services/firebase.js';

function Room(props){
    const combinedPlaylist = useModelProp(roomModel, "playlist");
    const creator = useModelProp(roomModel, "creator");
    const roomName = useModelProp(roomModel, "roomName");
    const started = useModelProp(roomModel, "started"); // boolean som visar om man klickat på start
    const data = [combinedPlaylist];
    if (combinedPlaylist.length > 0) {
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
                    console.log(playersuid)
                    let playlist = quizPlaylist(playersuid);
                    console.log(playlist)
                    playlist.then((tracks) => addPlaylistToFB(tracks, roomName));
                    //.then(() => props.history.push('/quizPlaying'));
                }
                console.log("innan man statar", roomModel.currentSongIndex);
                setCurrentSongIndexFB();
                setStartedFB(true);
            }
            });
}

async function quizPlaylist (arrayuid) {
    let combinedPlaylist = [];
    let combinedPlaylistHolder = []; // används för att hålla de låtar som finns flera av så länge
    let combinedPlaylistUnique = [];
    for (let i = 0; i < arrayuid.length; i++) {
        let token = (await getUserToken(arrayuid[i])).val(); // hämtar ut token
        let userPlaylist = await getUserPlaylists(token);
        combinedPlaylist.push(userPlaylist); // lägger till i den stora playlisten med alla användares låtar
    }    
    
    let i = 0;
    do {
        let trackThreshold = arrayuid.length - i; // används för att sänka kravet om att alla users ska ha låtarna i playlists
        let combinedPlaylistForReduce = combinedPlaylist.flat(); // gör detta här för o undvika varning att det är unsafe use of references/variables. den blir arg om man använder combinedPlaylist

        combinedPlaylistHolder = combinedPlaylistForReduce.reduce((acc, currentTrack) => {
            if (combinedPlaylistForReduce.filter(track => track[1] === currentTrack[1]).length === trackThreshold) { // om tracket finns lika många gånger som det finns spelare (dvs. alla har låten i någon av sina listor)
                combinedPlaylistForReduce = combinedPlaylistForReduce.filter(track => track[1] !== currentTrack[1]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
                return ([...acc, currentTrack]); // och lägger till den till accumulatorn
            }
            else {
                return acc;
            }
            }, []);
        
        let combinedPlaylistHolderRemove = [...combinedPlaylistHolder]; // är detta dumt?
        
        for (let i = 0; i < combinedPlaylistHolder.length; i++) { // Plockar ut 10 random låtar
            let randomIndex = Math.floor(Math.random() * combinedPlaylistHolderRemove.length);
            let trackAdd = combinedPlaylistHolderRemove[randomIndex];
            if (trackAdd[1] !== null) { //om tracket inte har en url
                combinedPlaylistUnique.push(trackAdd);
            }
            if (combinedPlaylistUnique.length === 10) { // så fort vi har 10 låtar breakar vi
                break;
            }
            combinedPlaylistHolderRemove.splice(randomIndex, 1); // tar bort låten vi lade till så att vi inte råkar lägga in dubbelt
            }
            i++;
        }
    while (combinedPlaylistUnique.length < 10 && i < arrayuid.length);
    
    combinedPlaylistUnique = listWithObj(combinedPlaylistUnique);
    combinedPlaylistUnique = combinedPlaylistUnique.sort(() => Math.random() - 0.5); // shufflar allt
    console.log("Added playlist to roommodel");
    return combinedPlaylistUnique;
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