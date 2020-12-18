import React, {useState, useEffect} from "react";
import {roomModel} from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import {setPlayerScoreFB, setPlayerAnswerFB, removeAnswerFB} from '../services/firebase.js';
import {useHistory} from "react-router-dom";
import useModelProp from "./useModelProp.js";

function QuizPlayingSong(props) {
    const [timeLeft, setTimeLeft] = useState(100)
    const [answer, setAnswer]= useState("");
    const finalAnswer = useModelProp(roomModel, "answer");
    let history = useHistory();
    useEffect(() => {
        removeAnswerFB();
        setTimeout(() => setTimeLeft(0), 50); // väntar med att laddningsbaren börjar för att animationen avbryts om inte allt på sidan laddat klart
        let currentSong = playSong();
        const timeout = setTimeout(() => {
            currentSong.pause();
            setTimeLeft(0);
            //setPlayerAnswerFB(roomModel.getAnswer());
            roomModel.checkCorrectAnswer() && setPlayerScoreFB();
            history.push('/quiz/answers');
        }, (roomModel.time*1000));
        return () => clearTimeout(timeout);
    }, []);
    return React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            loadTime: roomModel.time,
            onSubmit: () => {
                document.getElementById("inputBar").value = ""
                setPlayerAnswerFB(answer);
            },
            onText: name => setAnswer(name),
            submittedAnswer: finalAnswer ? finalAnswer : ""
        })
}


function playSong () {
    const currentSong = new Audio(roomModel.getPlaylist()[roomModel.getCurrentSongIndex()].url);
    currentSong.volume = 0.05;
    currentSong.play();
    return currentSong;
}

export default QuizPlayingSong;