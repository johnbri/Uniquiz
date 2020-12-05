import '../../css/quiz.css';
const QuizPlaying= ({ timeLeft, onText, onSubmit}) =>
    <div className="quiz">
        <h1>Guess the song!</h1>
        <div className="loader-container">
            <div className="loader">
                <div className="loader-bar" style={{width:`${timeLeft}%`}}/>
            </div>
        </div>
        <input type="text" id="searchbar" onChange={(event)=> onText(event.target.value)}/>
        <button onClick={() => onSubmit()}>Submit Answer!</button>
    </div>;

export default QuizPlaying;