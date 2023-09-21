import React, {useState} from "react";

function LoginForm({onLogin}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
            } else {
                console.log('error')
            }
        })
    }
    
    return (
        <div>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                <button
                type="submit"
                >Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm