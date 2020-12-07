import '../../css/quiz.css';
const QuizAnswersView= ({ userImg, score, displayName}) =>
    <div className="playersSidebar">
        <div>
        <h1>{displayName}</h1>
        <div className="userImg">
            <img src ={userImg} alt="userImg"></img>
        </div>
        <h2>score: {score}</h2>
        </div>
    </div>;
export default QuizAnswersView;