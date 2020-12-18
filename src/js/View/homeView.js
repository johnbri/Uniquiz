import '../../css/Home.css';

const homeView= ({userImg, onCreate, onJoin, userName, onLogOut}) =>
/** Page that displays opition for the user */
    <div className="wrapper">
        <div className="home">
            <img className="logo" src = "logo.png" alt="Uniquiz logo"/> <br/>
            <h1>Welcome, {userName}!</h1>
            <div className="homeButtons">
                <button onClick={() => onCreate()}>Create Quiz</button>
                <button onClick={() => onJoin()}>Join Quiz</button>
            </div>
        </div>
        <div className = "profile">
            <img className="userImg" src ={userImg} alt="userImg"></img>
            <button className="logout" onClick={() => onLogOut()}>Log out</button>
        </div>
    </div>;

export {homeView};