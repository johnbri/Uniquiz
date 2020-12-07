const RoomView = ({roomName, playerNames, onStart, onExit}) =>
    <div>
        {"hej"}
        <button onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        <button onClick={() => onStart()}>Start quiz!</button>
    </div>

export default RoomView;