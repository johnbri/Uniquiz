import React, { useState, useEffect} from "react";
import { roomModel } from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'

function QuizPlaying(props) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [answer, setAnswer]= useState("");
    const [songPlaying, setSongPlaying] = useState(true);
    
    useEffect(() => {
        setTimeLeft(100); //används för att css baren ska börja laddas upp till 100%
        playSong();
        const timeout = setTimeout(() => {
            setSongPlaying(false); // efter 15s
        }, 15000);
        return () => clearTimeout(timeout);
    }, []);
    
    return songPlaying 
        ? React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            onSubmit: () => roomModel.setAnswer(answer),
            onText: name => setAnswer(name)
        })
        : returnToQuiz(props);
}

function returnToQuiz (props) {
    props.history.push('/quiz');
    return null;
}

function playSong (data) {
    console.log(roomModel.getPlaylist());
    const currentSong = new Audio(roomModel.getPlaylist()[0].url);
    currentSong.volume = 0.05;
    currentSong.play();
}

export default QuizPlaying;