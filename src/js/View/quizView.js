import '../../css/quiz.css';
const QuizView= ({onPlay}) =>
    <div className="quiz">
        <h1>Welcome to the Quiz!</h1>
        <button onClick={() => onPlay()}>Start</button>
    </div>;
export default QuizView;