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
const CreateJoinRoomView = ({onSubmit, onText, onBack, title}) =>
    <div>
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>

        <input type="text" id="searchbar" onChange={(event, join)=> onText(event.target.value)}/>

        <button onClick={() => onSubmit() /*this.props.history.push("/roomXXX")*/}>{title} room</button>
    </div>

export {CreateJoinRoomView};
//ÄNDRA RUM i join room