import React, {useState} from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function LoginSignUpPage({onLogin, darkMode}) {
    
    const [login, setLogin] = useState(true)

    return (
        <div class={darkMode?"ui inverted raised segment":"ui raised segment"}>
            <h1>{login? "Login" : "Sign Up"}</h1>
            {login? (
                <>
                    <LoginForm
                    darkMode={darkMode}
                    onLogin={onLogin} />
                    <div class="ui inverted divider"></div>
                    <div>
                        <p>New here?</p>
                        <button class={darkMode?"ui inverted green button":"ui green button"}
                        onClick={() => setLogin(!login)}>Sign Up</button>
                    </div>
                </>
            ) :(
                <>
                    <SignUpForm
                    darkMode={darkMode}
                    onLogin={onLogin} />
                    <div class="ui inverted divider"></div>
                    <div>
                        <p>Already have an account?</p>
                        <button class={darkMode?"ui inverted green button":"ui green button"}
                        onClick={() => setLogin(!login)}>Login</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default LoginSignUpPage