import React, {useState} from "react";

function SignUpForm({onLogin}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username,
            password,
            password_confirmation: passwordConfirmation,
            image_url: imageUrl,
            bio,
            }),
        }).then((r) => {
            if (r.ok) {
            r.json().then((user) => onLogin(user))
            } else {
            r.json().then((err) => setErrors(err.errors))
            }
        });
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
                        type="text"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div>
                        <input
                        type="confirmPassword"
                        id="confirmPassword"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default SignUpForm