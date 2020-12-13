import '../../css/Room.css';

const RoomView = ({creator, roomName, playerNames, onStart, onExit}) =>
    /** Page that works as a lobby before game */
    <div className= "room"> 
        <button className="exitButton" onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        <button className="startButton" onClick={() => onStart()} disabled={!creator}>Start quiz!</button><br/>
        {!creator && <span>The host starts the game.</span> }
    </div>

export default RoomView;