import '../../css/quiz.css';
const QuizAnswersView= ({correctName, correctArtists, correctImg, creator, onPlay}) =>
    <div className="quizAnswers">
        <h1>The correct answer was...</h1>
        <img src = {correctImg} alt ="Track"></img>
        <div className="correctAnswer">
            <h2>{correctName}</h2> by {correctArtists && correctArtists.map((element, index) => 
                index === correctArtists.length - 1
                ?
                <span key = {element + index}> & {element} </span>
                :
                index === correctArtists.length - 2
                ?
                <span key = {element + index}>{element} </span>
                :
                <span key = {element + index}>{element}, </span>
            )}
        </div>
        {creator ? <button onClick={() => onPlay()} >Next Song</button> : <span>Waiting for creator to continue the game</span> }
    </div>;
export default QuizAnswersView;