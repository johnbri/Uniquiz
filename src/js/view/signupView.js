const SignupView = ({onEmail, onName, onPassword, onSignup}) =>
    /**Page where the user can create an account */
    <div className="login">
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Display name</p>
        <input type="text" onChange={(event) => onName(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
        <button onClick={() => onSignup()}>CREATE ACCOUNT</button>
    </div>;

export {SignupView};

