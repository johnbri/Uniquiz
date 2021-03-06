import '../../css/quiz.css';
import React from "react"
import { roomModel } from '../..';

const QuizPlaying= ({ timeLeft, onText, onSubmit, loadTime, submittedAnswer, onClear}) => 
    /** View for playing song */
    <div className="quizWrapper">
        <div className="quizPlaying">
            <h1>Track {roomModel.currentSongIndex+1} of {roomModel.playlist.length}</h1>
            <div className="loader-container">
                <div className="loader">
                    <div className="loader-bar" style={{width:`${timeLeft}%`,
                                                        transition: `width ${loadTime}s linear`}}/>
                    </div>
                </div>
            <h2>Guess the track before the time runs out!</h2>
            <div className="submit">
                <input className="input" id="inputBar"
            type="text" placeholder="Type trackname..." autoComplete="off" contentEditable="true"
                onChange={(event)=> onText(event.target.value)}
                onKeyDown={(e) => {
                    e.key === 'Enter' && onSubmit(); 
                    }
                } 
                ref = {inputElement => {
                    if (inputElement) {
                    inputElement.focus()}}}
                />
                <button className="submitButton" onClick={() => onSubmit()}>Submit Answer</button>
            </div>
            <div className="submittedanswer">
                <h2>Your submitted answer: {submittedAnswer}</h2>
            </div>
        </div>
    </div>;

export default QuizPlaying;

/*
ref = {inputElement => {
                // constructs a new function on each render
                if (inputElement) {
                  inputElement.focus();}}}
                  */
