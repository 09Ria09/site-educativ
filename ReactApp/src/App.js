import React, {useEffect, useRef, useState} from "react";
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./components/js/Home";
import Discover from "./components/js/Discover";
import Navbar from "./components/js/Navbar";
import SignUp from "./components/js/SignUp";
import SignIn from "./components/js/SignIn";
import ForgotPassword from "./components/js/ForgotPassword";
import Profile from "./components/js/Profile";
import SkyCanvas from "./components/js/SkyCanvas";
import {CSSTransition} from "react-transition-group";
import Cookies from 'universal-cookie';
import axios from "axios";

function App() {
    const routes = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/discover', name: 'Discover', Component: Discover},
        {path: '/forgotPassword', name: 'Forgot Password', Component: ForgotPassword},
        {path: '/profile', name: 'Profile', Component: Profile},
        {path: '/signUp', name: 'Sign Up', Component: SignUp},
        {path: '/signIn', name: 'Sign In', Component: SignIn}];

    const cookies = new Cookies();
    const [signedIn, setSignedIn] = useState(cookies.get('signed-in') === 'true');
    const signedInRef = useRef(signedIn);
    signedInRef.current = signedIn;

    useEffect(() => {

        const checkIfSignedIn = () => {
            axios({
                method: 'post',
                url: '/IsSignedIn'
            }).then(res => {
                let tmp = JSON.parse(res.request.response).signedIn;
                if (signedInRef.current !== tmp) {
                    setSignedIn(tmp)
                    if (tmp === true)
                        cookies.set('signed-in', true, {sameSite: true});
                }
            })
        }

        checkIfSignedIn();
        const checkIfSignedInInterval = setInterval(checkIfSignedIn, 100000);
        return () => clearInterval(checkIfSignedInInterval);
    }, []);

    return (
        <React.Fragment>
            <SkyCanvas style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                zIndex: '-1',
            }}/>
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
        </React.Fragment>
    );
}

export default App;
