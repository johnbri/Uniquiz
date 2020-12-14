import '../../css/quiz.css';
import React from "react"

const QuizPlaying= ({ timeLeft, onText, onSubmit, loadTime}) => 
    /** donno */

    <div className="quizPlaying">
        <h1>Submit track before the time runs out!</h1>
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
    </div>;

export default QuizPlaying;

/*
ref = {inputElement => {
                // constructs a new function on each render
                if (inputElement) {
                  inputElement.focus();}}}
                  */