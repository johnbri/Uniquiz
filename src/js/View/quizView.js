const QuizView= ({onPlay, timeLeft}) =>
    <div className="quiz">
        <h1>Welcome to the Quiz!</h1>
        <h2>{timeLeft}</h2>
        <button onClick={() => onPlay()}>Play song</button>
    </div>;

export default QuizView;