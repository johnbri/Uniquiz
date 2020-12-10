import '../../css/quiz.css';
const QuizAnswersView= ({creator, correctAnswer, score, displayName, onPlay}) =>
    <div className="quiz">
        <h1>The correct answer was: {correctAnswer}</h1>
        {creator ? <button onClick={() => onPlay()} >Next Song</button> : <span>Waiting for creator to continue the game</span> }
    </div>;
export default QuizAnswersView;