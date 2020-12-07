import '../../css/Home.css';

const homeView= ({onCreate, onJoin, userName, onLogOut}) =>
    /** Page that displays opition for the user */
    <div className="home">
        <button className="logout" onClick={() => onLogOut()}>Log out</button>
        <br/><img
        src = "logo.png"
        alt="Spotify logo"
        /> <br/>
        
        <h1>Welcome, {userName}!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
        
    </div>;

export {homeView};