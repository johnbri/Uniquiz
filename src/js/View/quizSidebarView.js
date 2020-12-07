import '../../css/quiz.css';
const QuizAnswersView= ({ score, displayName}) =>
    <div className="playersSidebar">
        <div>
        <h1>{displayName}</h1>
        <h2>score: {score}</h2>
        </div>
    </div>;
export default QuizAnswersView;