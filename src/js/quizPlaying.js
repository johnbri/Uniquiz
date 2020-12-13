import React, { useState, useEffect, useRef} from "react";
import { roomModel } from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import { setPlayerScoreFB, setPlayerAnswerFB } from '../services/firebase.js';
import GameInProgress from "./withAuth.js";
import { useHistory } from "react-router-dom";

function QuizPlayingSong(props) {
    const [timeLeft, setTimeLeft] = useState(0)

    const [answer, setAnswer]= useState("");
    let history = useHistory();
    useEffect(() => {
        setTimeout(() => setTimeLeft(100), 50); // väntar med att laddningsbaren börjar för att animationen avbryts om inte allt på sidan laddat klart
        let currentSong = playSong();
        const timeout = setTimeout(() => {
            currentSong.pause();
            setTimeLeft(0);
            setPlayerAnswerFB(roomModel.getAnswer());
            roomModel.checkCorrectAnswer() && setPlayerScoreFB();
            history.push('/quiz/answers');
        }, (roomModel.time*1000));
        return () => clearTimeout(timeout);
    }, []);
    return React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            loadTime: roomModel.time,
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

export default GameInProgress(QuizPlayingSong);