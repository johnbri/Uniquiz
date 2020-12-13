import '../../css/quiz.css';
const QuizPlaying= ({ timeLeft, onText, onSubmit}) =>
    /** donno */
    <div className="quizPlaying">
        {console.log("timeleft i viewn: ", timeLeft)}
        <h1>Guess the song!</h1>
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bar" style={{width:`${timeLeft}%`}}/>
            </div>
        </div>
        <input type="text" id="searchbar" placeholder="Type trackname..." autoComplete="off" onChange={(event)=> onText(event.target.value)}/>
        <button className="submitButton" onClick={() => onSubmit()}>Submit Answer!</button>
    </div>;

export default QuizPlaying;