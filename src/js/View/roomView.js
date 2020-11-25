const RoomView = ({
    players, setNumberOfSongs, setPlayTime, onStart
}) =>
    <div>
        <button onClick={() =>
            this.props.history.push("/home")}>
                Exit room
        </button>

        <h1>
            Example Quiz
        </h1>

        <div>{
            players.map(player=>
                <div>
                {player.name}
                </div>
                )}
        </div>

        <input type="text" id="playtime" onChange={(event)=>setNumberOfSongs(event.target.value)}>
                -
        </input>
        <input type="text" id="playtime" onChange={(event)=>setPlayTime(event.target.value)}>
                -
        </input>
        
        <button onClick={() =>
            this.props.history.push("/quiz")}>
                Start quiz!
        </button>
        <button onClick={(event)=>onStart(event.target.value)}>
            Start quiz!
        </button>

    </div>