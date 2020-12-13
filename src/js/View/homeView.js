import '../../css/Home.css';

const homeView= ({userImg, onCreate, onJoin, userName, onLogOut}) =>
/** Page that displays opition for the user */
    <div className="home">
        <div className="top"><br/>
        <img className="logo" src = "logo.png" alt="Uniquiz logo"/> <br/>
        <div className = "profile">
            <img className="userImg" src ={userImg} alt="userImg"></img><br/>
            <button className="logout" onClick={() => onLogOut()}>Log out</button>
        </div>
        </div>
        <h1>Welcome, {userName}!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
        
    </div>;

export {homeView};