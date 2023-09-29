import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function LoginForm({onLogin, darkMode}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => onLogin(user))
                setUsername('')
                setPassword('')
                history.push('/')
            } else {
                console.log('error')
            }
        })
    }
    
    return (
        <div>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div class={darkMode?"ui inverted input":"ui input"}>
                        <input
                        required
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div class="ui inverted divider"></div>
                    <div class={darkMode?"ui inverted input":"ui input"}>
                        <input
                        required
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div class="ui inverted divider"></div>
                <button
                class={darkMode?"ui primary button":"ui inverted primary button"}
                type="submit"
                >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm