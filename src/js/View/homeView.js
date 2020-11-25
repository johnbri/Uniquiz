const homeView= (txt) =>
    <div className="menu">
        <h1>Welcome, user!</h1>
        <p>{txt}</p>
        <button onClick={() => this.props.history.push("/create-quiz")}>Create Quiz</button>
        <button onClick={() => this.props.history.push("/join-quiz")}>Join Quiz</button>
    </div>;

export {homeView};