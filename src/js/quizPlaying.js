import React, {useState, useEffect} from "react";
import {roomModel} from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import {setPlayerScoreFB, setPlayerAnswerFB, removeAnswerFB} from '../services/firebase.js';
import {useHistory} from "react-router-dom";
import useModelProp from "./useModelProp.js";
import { useBeforeunload } from 'react-beforeunload';
function QuizPlayingSong(props) {
    const [timeLeft, setTimeLeft] = useState(100)
    const [answer, setAnswer]= useState("");
    const finalAnswer = useModelProp(roomModel, "answer");
    let history = useHistory();
    useBeforeunload(() => "Are you sure you want to leave the quiz?");
    
    useEffect(() => {
        let currentSong;
        let timeout;
        window.addEventListener('popstate', () => {
            window.alert("You will now leave the quiz");
            props.history.push('/home');
            window.location.reload();
            return null;
        });
        removeAnswerFB();
        if (roomModel.playlist.length !== 0) {
            setTimeout(() => setTimeLeft(0), 50); // väntar med att laddningsbaren börjar för att animationen avbryts om inte allt på sidan laddat klart
            currentSong = playSong()
            timeout = setTimeout(() => {
                currentSong.pause();
                setTimeLeft(0);
                roomModel.checkCorrectAnswer() && setPlayerScoreFB();
                history.push('/quiz/answers');
            }, (roomModel.time*1000));
        } else {
            props.history.push('/home');
        }
        return () => {
            clearTimeout(timeout);
        }
    }, []);
    return React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            loadTime: roomModel.time,
            onSubmit: () => {
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