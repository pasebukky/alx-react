import React from "react";
import './Login.css';

function Login() {
    return (
        <body className="App-body">
            <p>Login to access the full dashboard</p>
            <div className="Access-container">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="button">OK</button>
            </div>
        </body>
    )
}

export default Login;