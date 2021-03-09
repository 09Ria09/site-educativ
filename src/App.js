import React from "react";
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./components/js/Home";
import loginBox from "./components/js/loginBox";

const routes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/login', name: 'Login', Component: loginBox}];

function App() {
    return (
        <HashRouter>
            <React.Fragment>
                {routes.map(({path, name, Component}) => (
                    <Route key={name} exact path={path}>
                        <Component/>
                    </Route>
                ))}
            </React.Fragment>
        </HashRouter>
    );
}

export default App;
