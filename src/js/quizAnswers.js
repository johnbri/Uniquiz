import QuizAnswersView from './view/quizAnswersView.js';
import React, { useState, useEffect} from "react";
import {roomModel} from '../index.js';
import {userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import {setCurrentSongIndexFB} from '../services/firebase.js';

function QuizAnswers (props) {
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const creator = useModelProp(roomModel, "creator");
    const [nextSong, setNextSong] = useState(null);
    const currentSongIndex = useModelProp(roomModel, "currentSongIndex");
    const playlist = useModelProp(roomModel, "playlist");
    let lastSong = false;

    //Check if we are currenty on the last song
    if (currentSongIndex >= playlist.length-1) {
        lastSong = true;
    }
    //Listens for update from firebase
    useEffect(function(){ 
        setNextSong(currentSongIndex);
        (nextSong != null) && props.history.push('/quizPlaying') ;  
    }, [currentSongIndex]); 

    let Song = roomModel.getPlaylist()[roomModel.getCurrentSongIndex()];

    return React.createElement(QuizAnswersView, {
            btnText: lastSong ? "See Result" : "Next Song",
            correctName: Song.name,
            correctArtists: Song.artists,
            correctImg: Song.img,
            score: score,
            displayName: displayName,
            onPlay: () => {
                lastSong ? props.history.push('/results') : setCurrentSongIndexFB();
            },
            creator: creator
        });
}

export default QuizAnswers;