import '../../css/quiz.css';
import React from "react"

const QuizPlaying= ({ timeLeft, onText, onSubmit}) => 
    /** donno */

    <div className="quizPlaying">
        {console.log("timeleft i viewn: ", timeLeft)}
        <h1>Submit track before the time runs out!</h1>
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bar" style={{width:`${timeLeft}%`}}/>
            </div>
        </div>
        <input 
        type="text"vplaceholder="Type trackname..." autoComplete="off" 
            onChange={(event)=> onText(event.target.value)}
            onKeyDown={(e) => {e.key === 'Enter' && onSubmit()}} 
            ref = {inputElement => {
                if (inputElement) {
                  inputElement.focus()}}}
            />
        <button className="submitButton" 
        onClick={() => onSubmit()}>Submit Answer!</button>
    </div>;

export default QuizPlaying;

/*
ref = {inputElement => {
                // constructs a new function on each render
                if (inputElement) {
                  inputElement.focus();}}}
                  */