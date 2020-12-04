import '../../css/Home.css';

const homeView= ({onCreate, onJoin, userName}) =>
    <div className="home">
        <h1>Welcome, {userName}!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
    </div>;

export {homeView};