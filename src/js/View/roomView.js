import '../../css/Room.css';

const RoomView = ({creator, roomName, time, onStart, onExit, setTimer}) =>
    /** Page that works as a lobby before game */
    <div className= "room"> 
        <button className="exitButton" onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        
        <div>
            <label for="time">Guess time in seconds:  {time}</label>
            <input value={time} type="range" id="time" min="10" max="30" onChange={(event)=> setTimer(event.target.value) }/>
        </div>
        
        <button className="startButton" onClick={() => onStart()} disabled={!creator}>Start quiz!</button><br/>
        {!creator && <span>The creator starts the game</span> }
    </div>

export default RoomView;