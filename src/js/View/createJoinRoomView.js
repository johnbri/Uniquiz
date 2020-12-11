import '../../css/Home.css';

const CreateJoinRoomView = ({onSubmit, onText, onBack, title}) =>
    /** Lets the user either join och create a room */
    <div className="createjoin">
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>
        <input type="text" id="searchbar" onChange={(event)=> onText(event.target.value)}/>
        <button onClick={() => onSubmit()}>{title} room</button>
    </div>;

export {CreateJoinRoomView};