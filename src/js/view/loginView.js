import '../../css/Login.css';

const LoginView = ({onEmail, onPassword, onLogin, onSignUp, errorMessage}) =>
    /** Start page with login and sign up*/
    <div className="wrapper">
        <div className="login">
            <img src="logo.png" alt="UniQuiz logo"/>
            <h2>Challenge your friends in a quiz generated from songs you have in common on Spotify. A music quiz that's always fun!</h2>
            <p>Email</p>
            <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
            <p>Password</p>
            <input type="password" onChange={(event) => onPassword(event.target.value)}></input><br/>
            <p className="errorMessage">{errorMessage}</p>
            <button onClick={() => onLogin()}>Login</button> <br/>
            <span>Don't have an account? <a href="" onClick={(event) => {
                event.preventDefault();
                onSignUp()
            }}>Sign up here!</a></span>
        </div>
        
    </div>;

export {LoginView};

