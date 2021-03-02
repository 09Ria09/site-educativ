import React from 'react';
import './loginStyle.css'

function Login() {

    const Sign = () => {
        console.log("You Signed in");
    }

    return (
        <div className = "main">
            <p className = "sign" align = "center">Sign in</p>
            <form className = "form1">
                <input className = "un" type = "text" align = "center" placeholder = "Username"/>
                <input className = "un" type = "password" align = "center" placeholder = "Password"/>
                <a class="submit" align="center" onClick = {Sign}>Sign in</a>
                <p class="forgot" align="center"><a href="#"/>Forgot Password?</p>
            </form>
        </div>
    )
}

export default Login;