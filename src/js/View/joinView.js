const JoinView = ({
    onText
}) =>
    <div>
        <button onClick={() =>
            this.props.history.push("/home")}>
                Back
        </button>

        <h1>
            Join quiz
        </h1>

        <input type="text" id="searchbar" onChange={(event)=>
            onText(event.target.value)}>
                Search room...
        </input>

        <button onClick={() =>
            this.props.history.push("/roomXXX")}> 
                Join room
        </button>
    </div>

//ÄNDRA RUM i join room