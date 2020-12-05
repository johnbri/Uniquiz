import '../../css/Home.css';

const homeView= ({onCreate, onJoin, userName, onLogOut}) =>
    <div className="home">
        <img
        src = "logo.png"
        alt="Spotify logo"
        /> <br/>
        <h1>Welcome, {userName}!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
        <button onClick={() => onLogOut()}>Log out</button>
    </div>;

export {homeView};