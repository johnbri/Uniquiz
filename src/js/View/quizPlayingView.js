import '../../css/quiz.css';
const QuizPlaying= ({ timeLeft, onText, onSubmit}) =>
    /** donno */
    <div className="quizPlaying">
        <h1 className="guessTitle">Guess the song!</h1>
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bar" style={{width:`${timeLeft}%`}}/>
            </div>
        </div>
        <div className="submit">
            <input className="input" type="text" id="searchbar" autocomplete="off" onChange={(event)=> onText(event.target.value)}/>
            <button className="submitButton" onClick={() => onSubmit()}>Submit Answer!</button>
        </div>
    </div>;

export default QuizPlaying;