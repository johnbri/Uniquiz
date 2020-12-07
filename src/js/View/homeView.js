import '../../css/Home.css';

const homeView= ({userImg, onCreate, onJoin, userName, onLogOut, onToQuiz}) =>
    <div className="home">
        <div className="top"><br/><img
        src = "logo.png"
        alt="Spotify logo"
        /> <br/>
        <div className = "profile">
            <img src ={userImg} alt="userImg"></img>
            <button className="logout" onClick={() => onLogOut()}>Log out</button>
        </div>
        </div>
        <h1>Welcome, {userName}!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
        <button onClick={() => onToQuiz()}>Eriks to quiz btn</button>
        
    </div>;

export {homeView};