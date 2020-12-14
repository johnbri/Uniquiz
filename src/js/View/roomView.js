import '../../css/Room.css';

const RoomView = ({creator, roomName, time, tracks, onStart, onExit, setTime, setNumberOfTracks}) =>
    /** Page that works as a lobby before game */
    <div className= "room"> 
        <button className="exitButton" onClick={() => onExit()}>Exit quiz</button>
        <h1>{roomName}</h1>
        
        <div>
            <label>Guess time:  {time}s</label>
            {creator && <input value={time} type="range" step="5" id="time" min="5" max="30" onChange={(event)=> setTime(event.target.value) }/>}
        </div>

        <div>
            <label>Number of tracks:  {tracks}</label>
            {creator && <input value={tracks} type="range" id="time" min="1" max="15" onChange={(event)=> setNumberOfTracks(event.target.value) }/>}
        </div>
        <button className="startButton" onClick={() => onStart()} disabled={!creator}>Start quiz!</button><br/>
        {!creator && <span>The host starts the game.</span> }
    </div>

export default RoomView;