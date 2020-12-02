import '../../css/Login.css';

const StartView = ({onEmail, onPassword, onLogin, onSignUp}) =>
    <div className="login">
        <h1>UniQuiz</h1>
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
        <button onClick={() => onSignUp()}>CREATE ACCOUNT</button>
        <button onClick={() => onLogin()}>LOGIN</button>
    </div>;

export {StartView};

