import '../../css/Answers.css';

const QuizAnswersView= ({correctName, correctArtists, correctImg, creator, btnText, onPlay}) =>
    <div className="quizAnswers">
        <h1>The correct answer was...</h1>
        <div className="coverArtContainer">
            <img className="coverArt" src = {correctImg} alt ="Track"></img>
        </div>
        <div className="correctAnswer">
            <h2>{correctName}</h2> by {correctArtists && correctArtists.map((element, index) => 
                correctArtists.length === 1 ? <span key = {element + index}>{element} </span>
                :
                index === correctArtists.length - 1 && correctArtists.length !== 1 ? <span key = {element + index}> & {element} </span>
                :
                index === correctArtists.length - 2 ? <span key = {element + index}>{element} </span>
                :
                <span key = {element + index}>{element}, </span>
            )}
        </div>
        {creator ? <button onClick={() => onPlay()} >{btnText}</button> : <span>Waiting for the host to continue the game.</span> }
    </div>;
export default QuizAnswersView;
