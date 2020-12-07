const RoomView = ({roomName, playerNames, onStart, onExit}) =>
    /** Page that works as a lobby before game */
    <div>
        {"hej"}
        <button onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        <button onClick={() => onStart()}>Start quiz!</button>
    </div>

export default RoomView;