import '../../css/Home.css';

const CreateJoinRoomView = ({onSubmit, onText, onBack, title, errorMessage}) =>
    /** Lets the user either join och create a room */
    <div className="wrapper">
        <div className="backButton">
            <button onClick={() => onBack()}>Back</button>
        </div>
        <div className="createjoin">
            <h1>{title} quiz</h1>
            <div className="buttons">
                <input autoComplete="off" type="text" id="searchbar"
                 placeholder="Quiz name" 
                 onChange={(event)=> onText(event.target.value)}
                 onKeyDown={(e) => {
                    e.key === 'Enter' && onSubmit(); 
                    }}/>
                <button onClick={() => onSubmit()}>{title} quiz</button>
            </div>
            <span className="errorMessage">{errorMessage}</span>
            {title === "Create" ? <p>Want to play with your friends? Share the room name and ask them to join you!</p>
                                : <p>Write the name of an already existing room.</p>}
        </div>
    </div>;

export {CreateJoinRoomView};