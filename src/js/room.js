import React, { useEffect } from "react";
import RoomView from "./view/roomView.js";
import {roomModel, userModel, resetRoomModel} from "../index.js";
import useModelProp from "./useModelProp.js"
import NoDataView from './view/noDataView.js';
import { Redirect } from "react-router";
import { useBeforeunload } from 'react-beforeunload';
import {addRoomPlaylistToFB, setNumberOfTracksFB, setTimeFB, setQuizStatusFB, setCurrentSongIndexFB, removeUserFromRoomFB, setUserRoomStatusToFB, unSyncRoomModelToFB, removeRoomFB} from '../services/firebase.js';

function Room(props){
    /**Generates a lobby for players before starting a quiz. */
    const combinedPlaylist = useModelProp(roomModel, "playlist");
    const creator = useModelProp(roomModel, "creator");
    const roomName = useModelProp(roomModel, "roomName");
    const status = useModelProp(roomModel, "status");
    const time = useModelProp(roomModel, "time");
    const tracks = useModelProp(roomModel, "tracks")

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
            removeRoomFB(roomName)
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
    : (status === "inRoomGenerating" && combinedPlaylist.length === 0 ) ? NoDataView("Creating Quiz")
    : <Redirect to="/quiz/playing" />;
}

async function quizPlaylist () {
    /**Generates the playlist used in the quiz. The songs that users have in common are extracted. 
     * If there are no songs in common, random songs from different users are used. */
    let numPlayers = Object.keys(roomModel.players).length;
    let combinedPlaylist = [];
    let combinedPlaylistHolder = []; //used to save the songs that have duplicates in playlist
    let combinedPlaylistUnique = [];
    let i = 0;

    for (const key in roomModel.players) {
        combinedPlaylist = [roomModel.players[key].playlist, ...combinedPlaylist];
    }

    do {
        let trackThreshold = numPlayers - i; //used to lower the requirements for how many users that needs to have a song in common
        let combinedPlaylistForReduce = combinedPlaylist.flat(); //used to avoid warnings

        combinedPlaylistHolder = combinedPlaylistForReduce.reduce((acc, currentTrack) => {
            if (combinedPlaylistForReduce.filter(track => track[2] === currentTrack[2]).length === trackThreshold) { // om tracket finns lika många gånger som det finns spelare (dvs. alla har låten i någon av sina listor)
                combinedPlaylistForReduce = combinedPlaylistForReduce.filter(track => track[2] !== currentTrack[2]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
                return ([...acc, currentTrack]);
            } else {
                return acc;
            }}, []);
        
        let combinedPlaylistHolderRemove = [...combinedPlaylistHolder];
        
        for (let i = 0; i < combinedPlaylistHolder.length; i++) { //Takes out a certain number of songs from the combined playlist
            let randomIndex = Math.floor(Math.random() * combinedPlaylistHolderRemove.length);
            let trackAdd = combinedPlaylistHolderRemove[randomIndex];
            if (trackAdd.length === 5 && trackAdd[3] !== undefined) { //if the track doesn't have an URL etc.
                combinedPlaylistUnique.push(trackAdd);
            }
            if (combinedPlaylistUnique.length === roomModel.getNumberOfTracks()) { //when the playlist has enough songs, break the loop
                break;
            }
            combinedPlaylistHolderRemove.splice(randomIndex, 1); //remove the song that was added to the quiz so to avoid duplicates 
            }
            i++;
    }

    while (combinedPlaylistUnique.length < roomModel.getNumberOfTracks() && i < numPlayers);
    
    combinedPlaylistUnique = listWithObj(combinedPlaylistUnique);
    combinedPlaylistUnique = combinedPlaylistUnique.sort(() => Math.random() - 0.5); //shuffles the songs

    return combinedPlaylistUnique;
}


function listWithObj (list) {
    /**Makes the combined playlist into desired type */
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