import React, { useState, useEffect, useRef} from "react";
import { roomModel } from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import { setPlayerScoreFB} from '../services/firebase.js';

function QuizPlayingSong(props) {
    const [timeLeft, setTimeLeft] = useState(0)
    //const [timeLeft, setTimeLeft] = useState(0);
    const [answer, setAnswer]= useState("");
    useEffect(() => {
        setTimeout(() => setTimeLeft(100), 50); // väntar med att laddningsbaren börjar för att animationen avbryts om inte allt på sidan laddat klart
        let currentSong = playSong();
        const timeout = setTimeout(() => {
            currentSong.pause();
            calculateAnswer();
            setTimeLeft(0);
            props.history.push('/quiz/answers'); // Måste fixas, props går inte att nå så gjorde en ful lösning
            //console.log("efter pushen");
        }, 15000);
        return () => clearTimeout(timeout);
    }, []);
    //console.log("en rendewr");
    //console.log(timeLeft);
    return React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            onSubmit: () => {
                console.log("submited")
                roomModel.setAnswer(answer);
                console.log(roomModel.answers)
            },
            onText: name => setAnswer(name)
        })
}


function calculateAnswer() {
    if (roomModel.getAnswer() === roomModel.getPlaylist()[roomModel.getCurrentSongIndex()].name) {
        setPlayerScoreFB();
    }
}

function playSong () {
    const currentSong = new Audio(roomModel.getPlaylist()[roomModel.getCurrentSongIndex()].url);
    currentSong.volume = 0.05;
    currentSong.play();
    return currentSong;
}

export default QuizPlayingSong;