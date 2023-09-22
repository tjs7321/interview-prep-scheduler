import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function LoginSignUpPage({onLogin, darkMode}) {
    
    const [login, setLogin] = useState(true)

    return (
        <>
            <h1>{login? "Login" : "Sign Up"}</h1>
            {login? (
                <>
                    <LoginForm
                    darkMode={darkMode}
                    onLogin={onLogin} />
                    <p>New here?</p>
                    <button onClick={() => setLogin(!login)}>Sign Up</button>
                </>
            ) :(
                <>
                    <SignUpForm
                    darkMode={darkMode}
                    onLogin={onLogin} />
                    <p>Already have an account?</p>
                    <button onClick={() => setLogin(!login)}>Login</button>
                </>
            )}
        </>
    )
}

export default LoginSignUpPage