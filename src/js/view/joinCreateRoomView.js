/*const JoinView = ({
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
*/
const CreateJoinRoomView = ({newRoom, createRoom, joinRoom, onText}) =>
    <div>
        <button onClick={() => this.props.history.push("/home")}>Back</button>
        {newRoom ? <h1>Create quiz</h1> : <h1>Join quiz</h1>}

        <input type="text" id="searchbar" onChange={(event, join)=> onText(event.target.value)}/>

        <button onClick={() => {newRoom ? createRoom() : joinRoom() /*this.props.history.push("/roomXXX")*/}}>{newRoom ? "Create room" : "Join room"}</button>
    </div>

export {CreateJoinRoomView};
//ÄNDRA RUM i join room