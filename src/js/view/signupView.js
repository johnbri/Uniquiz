const SignupView = ({onEmail, onName, onPassword, onSignup, onLogin, errorMessage}) =>
    /**Page where the user can create an account */
    <div className="login">
        <p>Display name
            <br/><span><small>This name will be displayed to other users.</small></span>
        </p>
        
        <input type="text" onChange={(event) => onName(event.target.value)}></input>
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
        <p className="errorMessage">{errorMessage}</p>
        <button onClick={() => onSignup()}>CREATE ACCOUNT</button><br/>
        <span>Already have an account?</span>
        <button onClick={() => onLogin()}>LOGIN</button>
    </div>;

export {SignupView};

