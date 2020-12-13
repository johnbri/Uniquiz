import '../../css/Home.css';

const CreateJoinRoomView = ({onSubmit, onText, onBack, title}) =>
    /** Lets the user either join och create a room */
    <div className="createjoin">
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>
        <input type="text" id="searchbar" placeholder="Room name" onChange={(event)=> onText(event.target.value)}/>
        <button onClick={() => onSubmit()}>{title} room</button>
        {title === "Create" ? <p>Want to play with your friends? Share the room name and ask them to join you!</p>
                            : <p>Write the name of an already existing room.</p>}
    </div>;

export {CreateJoinRoomView};