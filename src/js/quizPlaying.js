import React, {useState, useEffect} from "react";
import {roomModel} from "../index.js";
import QuizPlayingView from './view/quizPlayingView.js'
import {setPlayerScoreFB, setPlayerAnswerFB, removeAnswerFB} from '../services/firebase.js';
import {useHistory} from "react-router-dom";
import useModelProp from "./useModelProp.js";
function QuizPlayingSong(props) {
    /**Presenter for when the quiz is playing a song. Generates the time bar and the song playing. */
    const [timeLeft, setTimeLeft] = useState(100)
    const [answer, setAnswer]= useState("");
    const finalAnswer = useModelProp(roomModel, "answer");
    let history = useHistory();

    useEffect(() => {
        let currentSong;
        let timeout;
        window.addEventListener('popstate', () => {
            props.history.push('/home');
            window.location.reload();
            return null;
        });
        removeAnswerFB();
        if (roomModel.playlist.length !== 0) {
            //waits for everything on the page to be loaded and ready, 
            //otherwise, the animation to the time bar will be disrupted 
            setTimeout(() => setTimeLeft(0), 50); 
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
                setPlayerAnswerFB(answer)
                document.getElementById("inputBar").value = ""
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