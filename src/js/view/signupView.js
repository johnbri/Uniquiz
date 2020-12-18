import '../../css/Login.css';

const SignupView = ({onEmail, onName, onPassword, onSignup, onLogin, errorMessage}) =>
    /**Page where the user can create an account */
    <div className="wrapper">
        <div className="login">
            <h1>Sign up</h1>
            <p>Display name</p>
            <input type="text" onChange={(event) => onName(event.target.value)}></input>
            <span className="inputComment">This name will be displayed to other users.</span>
            <p>Email</p>
            <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
            <p>Password</p>
            <input type="password" onChange={(event) => onPassword(event.target.value)}></input>
            <p className="errorMessage">{errorMessage}</p>
            <button className="signupButton" onClick={() => onSignup()}>CREATE ACCOUNT</button><br/>
            <span>Already have an account? <a href="" onClick={(event) => {
                event.preventDefault();
                onLogin()}}>Login here!</a></span>
        </div>
    </div>;

export {SignupView};

