import '../../css/quiz.css';
const QuizAnswersView= ({correctAnswer, score, displayName, onPlay}) =>
    <div className="quiz">
        <h1>The correct answer was: {correctAnswer}</h1>
        <button onClick={() => onPlay()}>Next Song!</button>
    </div>;
export default QuizAnswersView;