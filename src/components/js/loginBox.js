import React from 'react';
import '../css/loginStyle.css'

function Login() {

    const Sign = () => {
        console.log("You Signed in");
    }

    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <form className="form1">
                <input className="un" type="text" style={{display: "block", marginLeft: "auto", marginRight: "auto"}}
                       placeholder="Username"/>
                <input className="un" type="password"
                       style={{display: "block", marginLeft: "auto", marginRight: "auto"}} placeholder="Password"/>
                <a className="submit"
                   style={{width: "max-content", display: "block", marginLeft: "auto", marginRight: "auto"}}
                   onClick={Sign}>Sign in</a>
                <p className="forgot"
                   style={{width: "max-content", display: "block", marginLeft: "auto", marginRight: "auto"}}><a
                    href="#"/>Forgot Password?</p>
            </form>
        </div>
    )
}

export default Login;