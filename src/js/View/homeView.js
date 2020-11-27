const homeView= ({onCreate, onJoin, userName}) =>
    <div className="menu">
        <h1>Welcome, {userName}!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
    </div>;

export {homeView};