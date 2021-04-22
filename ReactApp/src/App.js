import React, {useEffect, useState} from "react";
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./components/js/Home/Home";
import Discover from "./components/js/Discover/Discover";
import Navbar from "./components/js/Navbar";
import SignUp from "./components/js/Sign/SignUp";
import SignIn from "./components/js/Sign/SignIn";
import ForgotPassword from "./components/js/Sign/ForgotPassword";
import Profile from "./components/js/Profile/Profile";
import {CSSTransition} from "react-transition-group";
import Cookies from 'universal-cookie';
import axios from "axios";
import ChangePassword from "./components/js/Sign/ChangePassword";
import Notifications from "./components/js/Notifications";

function App() {
    const routes = [
        {path: '/', name: 'Home', Component: Home},
        {path: '/discover', name: 'Discover', Component: Discover},
        {path: '/forgotPassword', name: 'Forgot Password', Component: ForgotPassword},
        {path: '/changePassword/*', name: 'Change Password', Component: ChangePassword},
        {path: '/profile', name: 'Profile', Component: Profile},
        {path: '/signUp', name: 'Sign Up', Component: SignUp},
        {path: '/signIn', name: 'Sign In', Component: SignIn},
        {path: '/notification', name: 'Notifications', Component: Notifications }
        
    ];


    const cookies = new Cookies();
    const [signedIn, setSignedIn] = useState(cookies.get('signed-in') === 'true');
    const [verified, setVerified] = useState(cookies.get('verified') === 'true');
    const [completedProfile, setCompletedProfile] = useState(cookies.get('completed-profile') === 'true');

    useEffect(() => {

        const checkIfSignedIn = () => {
            axios({
                method: 'post',
                url: '/IsSignedIn'
            }).then(res => {
                let tmp = JSON.parse(res.request.response);
                if (tmp.signedIn === true) {
                    if (signedIn !== tmp.signedIn) {
                        setSignedIn(tmp.signedIn)
                        cookies.set('signed-in', true, {sameSite: true});
                    }
                    if (verified !== Boolean(tmp.verified)) {
                        setVerified(Boolean(tmp.verified));
                        cookies.set('verified', Boolean(tmp.verified), {sameSite: true});
                    }
                    if (completedProfile !== Boolean(tmp.completed_profile)) {
                        setCompletedProfile(Boolean(tmp.completed_profile));
                        cookies.set('completed-profile', Boolean(tmp.completed_profile), {sameSite: true});
                    }
                }
            }).catch(() => clearInterval(checkIfSignedInInterval))
        }

        checkIfSignedIn();
        const checkIfSignedInInterval = setInterval(checkIfSignedIn, 10000);
        return () => clearInterval(checkIfSignedInInterval);
    }, []);

    return (
        <React.Fragment>
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
                                <Component signedIn={signedIn} setSignedIn={setSignedIn}
                                           verified={verified} setVerified={setVerified}
                                           completedProfile={completedProfile} setCompletedProfile={setCompletedProfile}
                                />
                            </div>
                        </CSSTransition>)}
                    </Route>
                ))}
            </HashRouter>
        </React.Fragment>
    );
}

export default App;
