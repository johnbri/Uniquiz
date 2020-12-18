import React, { useEffect } from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel, resetRoomModel} from "../index.js";
import useModelProp from "./useModelProp.js"
import NoDataView from './view/noDataView.js';
import { Redirect } from "react-router";
import { useBeforeunload } from 'react-beforeunload';
import {addRoomPlaylistToFB, setNumberOfTracksFB, setTimeFB, setQuizStatusFB, setCurrentSongIndexFB, removeUserFromRoomFB, setUserRoomStatusToFB, unSyncRoomModelToFB} from '../services/firebase.js';

function Room(props){
    const combinedPlaylist = useModelProp(roomModel, "playlist");
    const creator = useModelProp(roomModel, "creator");
    const roomName = useModelProp(roomModel, "roomName");
    const status = useModelProp(roomModel, "status");
    const time = useModelProp(roomModel, "time");
    const tracks = useModelProp(roomModel, "tracks")
    const data = [combinedPlaylist, creator, status];
    useBeforeunload(() => "Are you sure you want to leave the quiz?");
    if (combinedPlaylist.length !== 0 && creator) {
        setQuizStatusFB("inGame");
    }
    useEffect(() => {
        if(!roomModel.roomName) {
            props.history.push('/home');
        }
    });

    return status === "inRoom" ? React.createElement(RoomView,{
        creator: creator,
        roomName: roomName,
        playerNames: userModel.players,
        time: time,
        tracks: tracks,
        onExit: () => {
            unSyncRoomModelToFB(roomName);
            removeUserFromRoomFB();
            setUserRoomStatusToFB(false);
            resetRoomModel();
            props.history.push("/home");
        },
        onStart: () => {
            let combinedPlaylist = quizPlaylist();
            combinedPlaylist.then(tracks => addRoomPlaylistToFB(tracks, roomName));
            setCurrentSongIndexFB();
            setQuizStatusFB("inRoomGenerating")},
        setTime: input => setTimeFB(parseInt(input)),
        setNumberOfTracks: input=> setNumberOfTracksFB(parseInt(input))
        })
    : (status === "inRoomGenerating" && combinedPlaylist.length === 0 ) ? NoDataView(data, "Creating Quiz")
    : <Redirect to="/quiz/playing" />;
}


async function quizPlaylist () {
    let numPlayers = Object.keys(roomModel.players).length;
    let combinedPlaylist = [];
    let combinedPlaylistHolder = []; // används för att hålla de låtar som finns flera av så länge
    let combinedPlaylistUnique = [];
    let i = 0;

    for (const key in roomModel.players) {
        combinedPlaylist = [roomModel.players[key].playlist, ...combinedPlaylist];
    }
    do {
        let trackThreshold = numPlayers - i; // används för att sänka kravet om att alla users ska ha låtarna i playlists
        let combinedPlaylistForReduce = combinedPlaylist.flat(); // gör detta här för o undvika varning att det är unsafe use of references/variables. den blir arg om man använder combinedPlaylist

        combinedPlaylistHolder = combinedPlaylistForReduce.reduce((acc, currentTrack) => {
            if (combinedPlaylistForReduce.filter(track => track[2] === currentTrack[2]).length === trackThreshold) { // om tracket finns lika många gånger som det finns spelare (dvs. alla har låten i någon av sina listor)
                combinedPlaylistForReduce = combinedPlaylistForReduce.filter(track => track[2] !== currentTrack[2]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
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
            if (trackAdd.length === 5 && trackAdd[3] !== undefined) { //om tracket inte har en url osv...
                combinedPlaylistUnique.push(trackAdd);
            }
            if (combinedPlaylistUnique.length === roomModel.getNumberOfTracks()) { // så fort vi har 10 låtar breakar vi
                break;
            }
            combinedPlaylistHolderRemove.splice(randomIndex, 1); // tar bort låten vi lade till så att vi inte råkar lägga in dubbelt
            }
            i++;
        }
    while (combinedPlaylistUnique.length < roomModel.getNumberOfTracks() && i < numPlayers);
    
    combinedPlaylistUnique = listWithObj(combinedPlaylistUnique);
    combinedPlaylistUnique = combinedPlaylistUnique.sort(() => Math.random() - 0.5); // shufflar allt
    return combinedPlaylistUnique;
}


function listWithObj (list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList[i] = {
            name: list[i][0], 
            artists: list[i][1],
            url: list[i][3],
            img: list[i][4]
        }
    }
    return newList;
}

export default Room;