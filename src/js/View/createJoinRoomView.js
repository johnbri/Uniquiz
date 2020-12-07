import '../../css/Home.css';

const CreateJoinRoomView = ({onSubmit, onText, onBack, title, onLogOut}) =>
    <div className="createjoin">
        <button className="logout" onClick={() => onLogOut()}>Log out</button>
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>

        <input type="text" id="searchbar" onChange={(event)=> onText(event.target.value)}/>

        <button onClick={() => onSubmit() /*this.props.history.push("/roomXXX")*/}>{title} room</button>
    </div>

export {CreateJoinRoomView};
//ÄNDRA RUM i join room