import '../../css/Login.css';

const LoginView = ({onEmail, onPassword, onLogin, onSignUp}) =>
    /** Start page with login and sign up*/
    <div className="login">
        <img src = "logo.png" alt="UniQuiz logo"/> <br/>
        <p>Email</p>
        <input type="text" onChange={(event) => onEmail(event.target.value)}></input>
        <p>Password</p>
        <input type="password" onChange={(event) => onPassword(event.target.value)}></input><br/>
        <button onClick={() => onLogin()}>LOGIN</button> <br/>
        <button onClick={() => onSignUp()}>CREATE ACCOUNT</button>
    </div>;

export {LoginView};

