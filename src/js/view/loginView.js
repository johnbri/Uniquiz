import '../../css/Login.css';

const LoginView = ({onEmail, onPassword, onLogin, onSignUp, errorMessage}) =>
    /** Start page with login and sign up*/
    <div className="wrapper">
        <div className="login">
            <img src="logo.png" alt="UniQuiz logo"/>
            <h2>Challenge you friends with songs you have in common. Who is the better fan of your favourite aritsts?</h2>
            <p>Email</p>
            <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
            <p>Password</p>
            <input type="password" onChange={(event) => onPassword(event.target.value)}></input><br/>
            <p className="errorMessage">{errorMessage}</p>
            <button onClick={() => onLogin()}>LOGIN</button> <br/>
            <span>Don't have an account? <a href="" onClick={(event) => {
                event.preventDefault();
                onSignUp()
            }}>Sign up here!</a></span>
        </div>
        
    </div>;

export {LoginView};

