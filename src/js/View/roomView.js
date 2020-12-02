const RoomView = ({
    roomName, players, onStart, onExit
}) =>
    <div>
        <button onClick={() => onExit()}>
                Exit room
        </button>
        
        <h1>
            Example Quiz
        </h1>

        <h1>
            {roomName}
        </h1>
        
        <div>
            {players
            /*players.map(player=>
                <div>
                {player.name}
                </div>
            )*/}
        </div>
        
        <button onClick={() => onStart()}>
                Start quiz!
        </button>

    </div>

export {RoomView};