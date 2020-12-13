import React, { useState, useEffect, useRef} from "react";
import { roomModel } from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import { setPlayerScoreFB, setPlayerAnswerFB } from '../services/firebase.js';
import withAuth from "./withAuth.js";

function QuizPlayingSong(props) {
    const [timeLeft, setTimeLeft] = useState(0)

    const [answer, setAnswer]= useState("");
    useEffect(() => {
        setTimeout(() => setTimeLeft(100), 50); // väntar med att laddningsbaren börjar för att animationen avbryts om inte allt på sidan laddat klart
        let currentSong = playSong();
        const timeout = setTimeout(() => {
            currentSong.pause();
            setTimeLeft(0);
            setPlayerAnswerFB(roomModel.getAnswer());
            roomModel.checkCorrectAnswer() && setPlayerScoreFB();
            props.history.push('/quiz/answers');
        }, 15000);
        return () => clearTimeout(timeout);
    }, []);
    return React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            onSubmit: () => {
                roomModel.setAnswer(answer);
            },
            onText: name => setAnswer(name)
        })
}


function playSong () {
    const currentSong = new Audio(roomModel.getPlaylist()[roomModel.getCurrentSongIndex()].url);
    currentSong.volume = 0.05;
    currentSong.play();
    return currentSong;
}

export default QuizPlayingSong;