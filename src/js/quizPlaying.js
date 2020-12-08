import React, { useState, useEffect} from "react";
import { roomModel } from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import { useHistory } from "react-router-dom";

function QuizPlayingSong(props) {
    let history = useHistory();
    const [timeLeft, setTimeLeft] = useState(0);
    const [answer, setAnswer]= useState("");
    const [songPlaying, setSongPlaying] = useState(true);
    console.log(roomModel.playList);
    useEffect(() => {
        setTimeLeft(100); //används för att css baren ska börja laddas upp till 100%
        let currentSong = playSong();
        const timeout = setTimeout(() => {
            currentSong.pause();
            calculateAnswer();
            setSongPlaying(false); // efter 15s slutar låten
            history.push('/quizAnswers'); // Måste fixas, props går inte att nå så gjorde en ful lösning
        }, 15000);
        return () => clearTimeout(timeout);
    }, []);
    
    return songPlaying 
        ? React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            onSubmit: () => {
                roomModel.setAnswer(answer);
            },
            onText: name => setAnswer(name)
        })
        : null;
}

function calculateAnswer() {
    if (roomModel.getAnswer() === roomModel.getPlayedSong().name) {
        roomModel.setScore();
    }
    //console.log("Current score: " + roomModel.score);
}

function playSong () {
    const currentSong = new Audio(roomModel.getCurrentSong().url);
    currentSong.volume = 0.05;
    currentSong.play();
    return currentSong;
}

export default QuizPlayingSong;