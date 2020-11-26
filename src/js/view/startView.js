const StartView = ({onEmail, onPassword, onSignUp, onSignin}) =>
    <div className="login">
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
        <button onClick={() => onSignUp()}>CREATE ACCOUNT</button>
        <button onClick={() => onSignin()}>LOGIN</button>
    </div>;

export {StartView};
