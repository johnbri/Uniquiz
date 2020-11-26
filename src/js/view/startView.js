const StartView = ({onEmail, onPassword, onSignup}) =>
    <div className="login">
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
        <button onClick={() => onSignup()}>CREATE ACCOUNT</button>
    </div>;

export {SignupView};

