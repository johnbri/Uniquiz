const RoomView = ({
    onText, players, onStart, onExit
}) =>
    <div>
        {console.log("hej")}
        <button onClick={() => onExit()}>
                Exit room
        </button>
        
        <input type="text" id="searchbar" onChange={(event)=>onText(event.target.value)}>

        </input>

        <h1>
            Example Quiz
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