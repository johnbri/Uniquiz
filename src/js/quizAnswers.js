import QuizAnswersView from './view/quizAnswersView.js';
import React, { useState, useEffect} from "react";
import {roomModel} from '../index.js';
import {userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import {setCurrentSongIndexFB} from '../services/firebase.js';

function QuizAnswers (props) {
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const correctAnswer = useModelProp(roomModel, "playedSongs");
    const creator = useModelProp(roomModel, "creator");
    const [nextSong, setNextSong] = useState(null);
    const currentSongIndex = useModelProp(roomModel, "currentSongIndex");
    useEffect(function(){ 
        setNextSong(currentSongIndex);
        nextSong != null && props.history.push('/quizPlaying');   
    }, [currentSongIndex]); 

    return React.createElement(QuizAnswersView, {
            correctName: correctAnswer[0].name,
            correctArtists: correctAnswer[0].artists,
            correctImg: correctAnswer[0].img,
            score: score,
            displayName: displayName,
            onPlay: () => {
                setCurrentSongIndexFB();
            },
            creator: creator
        });
}

export default QuizAnswers;