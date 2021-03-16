import React from "react";
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./components/js/Home";
import loginBox from "./components/js/LoginBox";
import SkyCanvas from "./components/js/SkyCanvas";
import Discover from "./components/js/Discover";
import {CSSTransition} from "react-transition-group";
import Navbar from "./components/js/Navbar";

const routes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/discover', name: 'Discover', Component: Discover},
    {path: '/login', name: 'Login', Component: loginBox}];

function App() {
    return (
        <HashRouter>
            <React.Fragment>
                <SkyCanvas style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    zIndex: '-1',
                }}/>
                <Navbar/>
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
                                <Component/>
                            </div>
                        </CSSTransition>)}
                    </Route>
                ))}
            </React.Fragment>
        </HashRouter>
    );
}

export default App;
