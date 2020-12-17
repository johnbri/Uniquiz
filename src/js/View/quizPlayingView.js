import '../../css/quiz.css';
import React from "react"
import { roomModel } from '../..';

const QuizPlaying= ({ timeLeft, onText, onSubmit, loadTime, submittedAnswer}) => 
    /** donno */

    <div className="quizPlaying">
        <h1>Track {roomModel.currentSongIndex+1} of {roomModel.playlist.length}</h1>
        <h2>Submit track before the time runs out!</h2>
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bar" style={{width:`${timeLeft}%`,
                                                    transition: `width ${loadTime}s linear`}}/>
            </div>
        </div>
        <input 
        type="text" placeholder="Type trackname..." autoComplete="off" 
            onChange={(event)=> onText(event.target.value)}
            onKeyDown={(e) => {e.key === 'Enter' && onSubmit()}} 
            ref = {inputElement => {
                if (inputElement) {
                  inputElement.focus()}}}
            />
        <button className="submitButton" 
        onClick={() => onSubmit()}>Submit Answer!</button>

        <h2>Your submitted answer: {submittedAnswer}</h2>
    </div>;

export default QuizPlaying;

/*
ref = {inputElement => {
                // constructs a new function on each render
                if (inputElement) {
                  inputElement.focus();}}}
                  */