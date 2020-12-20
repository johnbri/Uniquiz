import '../../css/Room.css';

const RoomView = ({creator, roomName, time, tracks, onStart, onExit, setTime, setNumberOfTracks}) =>
    /** Page that works as a lobby before game */
    <div className="quizWrapper">
         <div className="exit">
            <button className="exitButton" onClick={() => onExit()}>Exit Quiz</button>
        </div>
        <div className= "room">
            <h1 className="roomname">{roomName}</h1>
            <div className="settings">
            <div className="range-slider">
                    <label>Guess time:  {time}s</label><br/>
                    {creator && <input className="range" value={time} type="range" step="5" id="time" min="15" max="30" onChange={(event)=> setTime(event.target.value) }/>}
                </div>

                <div className="range-slider">
                    <label>Number of tracks:  {tracks}</label><br/>
                    {creator && <input className="range"value={tracks} type="range" id="time" min="1" max="15" onChange={(event)=> setNumberOfTracks(event.target.value) }/>}
                </div> 
            </div>
            <div className="start">
                <button className="startButton" onClick={() => onStart()} disabled={!creator}>Start Quiz!</button><br/>
                {!creator && <span>The host starts the game.</span> }
            </div>
        </div>
    </div>;

export default RoomView;
