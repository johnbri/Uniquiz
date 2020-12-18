import '../../css/quiz.css';
import React from "react"
import { roomModel } from '../..';

const QuizPlaying= ({ timeLeft, onText, onSubmit, loadTime, submittedAnswer, onClear}) => 
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
<<<<<<< HEAD
        <input 
        id="inputBar" type="text" placeholder="Type trackname..." autoComplete="off" 
=======
        <input className="input" id="inputBar"
        type="text" placeholder="Type trackname..." autoComplete="off" contentEditable="true"
>>>>>>> a9675a1043e1402792b3e02537530b1bb3c467d9
            onChange={(event)=> onText(event.target.value)}
            onKeyDown={(e) => {
                e.key === 'Enter' && onSubmit(); 
                }
            } 
            ref = {inputElement => {
                if (inputElement) {
                  inputElement.focus()}}}
            />
        <button className="submitButton" 
        onClick={() => onSubmit()}>Submit Answer!</button>
        <div className="submittedanswer">
            <h2>Your submitted answer:</h2><br/>
            <h2>{submittedAnswer}</h2> 
        </div>
        

    </div>;

export default QuizPlaying;

/*
ref = {inputElement => {
                // constructs a new function on each render
                if (inputElement) {
                  inputElement.focus();}}}
                  */
