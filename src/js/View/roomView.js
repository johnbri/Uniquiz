const RoomView = ({creator, roomName, playerNames, onStart, onExit}) =>
    /** Page that works as a lobby before game */
    <div>
        <button onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        {creator && <button onClick={() => onStart()}>Start quiz!</button> }
    </div>

export default RoomView;