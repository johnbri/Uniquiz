const homeView= ({onCreate, onJoin}) =>
    <div className="menu">
        <h1>Welcome, User!!</h1>
        <button onClick={() => onCreate()}>Create Quiz</button>
        <button onClick={() => onJoin()}>Join Quiz</button>
    </div>;

export {homeView};