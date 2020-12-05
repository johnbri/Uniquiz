import '../../css/Home.css';

const CreateJoinRoomView = ({onSubmit, onText, onBack, title}) =>
    <div class="createjoin">
        <button onClick={() => onBack()}>Back</button>
        <h1>{title} quiz</h1>

        <input type="text" id="searchbar" onChange={(event)=> onText(event.target.value)}/>

        <button onClick={() => onSubmit() /*this.props.history.push("/roomXXX")*/}>{title} room</button>
    </div>

export {CreateJoinRoomView};
//ÄNDRA RUM i join room