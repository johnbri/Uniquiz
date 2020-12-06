import React, { useState, useEffect} from "react";
import QuizPlayingView from './view/quizPlayingView.js'

function QuizPlaying(props) {
    const [timeLeft, setTimeLeft] = useState(0);
    const [songPlaying, setSongPlaying] = useState(true);
    
    useEffect(() => {
        setTimeLeft(100);
        const data = props.location.data;
        playSong(data);
        const timeout = setTimeout(() => {
            setSongPlaying(false);
        }, 30000);
        return () => clearTimeout(timeout);
    }, [props.location.data]);
    
    return songPlaying 
        ? React.createElement(QuizPlayingView, {
            timeLeft: timeLeft,
            onSubmit: () => console.log("submitted!"),
            onText: name => console.log(name)
        })
        : returnToQuiz(props);
}

function returnToQuiz (props) {
    props.history.push('/quiz');
    return null;
}

function playSong (data) {
    const currentSong = new Audio(data[0].url);
    currentSong.volume = 0.05;
    currentSong.play();
}

export default QuizPlaying;