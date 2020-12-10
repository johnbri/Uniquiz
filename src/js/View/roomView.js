const RoomView = ({creator, roomName, playerNames, onStart, onExit}) =>
    /** Page that works as a lobby before game */
    <div>
        <button onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        <button onClick={() => onStart()} disabled={!creator}>Start quiz!</button><br/>
        {!creator && <span>The creator starts the game</span> }
    </div>

export default RoomView;