import React, {useState} from "react";
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./components/js/Home";
import Discover from "./components/js/Discover";
import {CSSTransition} from "react-transition-group";
import Navbar from "./components/js/Navbar";
import SignUp from "./components/js/SignUp";
import SignIn from "./components/js/SignIn";
import ForgotPassword from "./components/js/ForgotPassword";
import Profile from "./components/js/Profile";

function App() {
    const routes = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/discover', name: 'Discover', Component: Discover},
        {path: '/forgotPassword', name: 'Forgot Password', Component: ForgotPassword},
        {path: '/profile', name: 'Profile', Component: Profile},
        {path: '/signUp', name: 'Sign Up', Component: SignUp},
        {path: '/signIn', name: 'Sign In', Component: SignIn}];

    const [signedIn, setSignedIn] = useState(false);
    return (
        <HashRouter>
            <Navbar signedIn={signedIn} setSignedIn={setSignedIn}/>
            {routes.map(({path, name, Component}) => (
                <Route key={name} exact path={path}>
                    {({match}) => (<CSSTransition
                        classNames={{
                            enterActive: 'animate__animated animate__fadeIn animate__faster',
                                exit: 'displayNone',
                            }}
                            onEnter={() => {
                                window.scrollTo(0, 0);
                            }}
                            timeout={500}
                            in={match != null}
                            unmountOnExit>
                            <div>
                                <Component signedIn={signedIn} setSignedIn={setSignedIn}/>
                            </div>
                        </CSSTransition>)}
                    </Route>
                ))}
        </HashRouter>
    );
}

export default App;
