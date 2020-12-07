import '../../css/Home.css';

const homeView= ({userImg, onCreate, onJoin, userName, onLogOut, onToQuiz}) =>
    <div className="home">
        <button className="logout" onClick={() => onLogOut()}>Log out</button>
        <br/><img
        src = "logo.png"
        alt="Spotify logo"
        /> <br/>
        <h1>Welcome, {userName}!!</h1>
        <div className="userImg">
            <img src ={userImg} alt="userImg"></img>
        </div>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
        <button onClick={() => onToQuiz()}>Eriks to quiz btn</button>
        
    </div>;

export {homeView};