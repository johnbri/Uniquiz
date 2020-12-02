const CreateJoinRoomView = ({onSubmit, onText, onBack, title}) =>
    <div>
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>

        <input type="text" id="searchbar" onChange={(event, join)=> onText(event.target.value)}/>

        <button onClick={() => onSubmit() /*this.props.history.push("/roomXXX")*/}>{title} room</button>
    </div>

export {CreateJoinRoomView};