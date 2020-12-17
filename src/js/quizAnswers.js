import QuizAnswersView from './view/quizAnswersView.js';
import React, {useState, useEffect} from "react";
import {roomModel} from '../index.js';
import {userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import {setCurrentSongIndexFB, setQuizStatusFB} from '../services/firebase.js';
import {Redirect} from 'react-router-dom'; 


function QuizAnswers (props) {
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const creator = useModelProp(roomModel, "creator");
    const [nextSong, setNextSong] = useState(null);
    const currentSongIndex = useModelProp(roomModel, "currentSongIndex");
    const playlist = useModelProp(roomModel, "playlist");
    const status = useModelProp(roomModel, "status");

    let lastSong = false;
    //Check if we are currently on the last song
    if (currentSongIndex >= playlist.length-1) {
        lastSong = true;
    }
    //Listens for update from firebase on which song index is next
    useEffect(function(){ 
        setNextSong(currentSongIndex);
        (nextSong != null) && props.history.push('/quiz/playing')
    }, [currentSongIndex]); 

    let Song = roomModel.getPlaylist()[roomModel.getCurrentSongIndex()];

    if (status === "inGame") {
        return  React.createElement(QuizAnswersView, {
                    btnText: lastSong ? "See Result" : "Next Song",
                    correctName: Song.name,
                    correctArtists: Song.artists,
                    correctImg: Song.img,
                    score: score,
                    displayName: displayName,
                    onPlay: () => {
                        lastSong ? setQuizStatusFB("inResults") : setCurrentSongIndexFB();
                    },
                    creator: creator
                })
    } else if (status === "inResults") {
        return <Redirect to="/results" />;
    } else if (status === "inRoom") {
        return <Redirect to="/room" />;
    } else {
        return <Redirect to="/home" />;
    }
}

export default QuizAnswers;