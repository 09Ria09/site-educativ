import React from 'react';
import ReactDOM from 'react-dom';
import "animate.css/animate.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {isMobile} from "react-device-detect";
import AlternativeSkyCanvas from './components/js/AlternativeSkyCanvas';

ReactDOM.render(
    <div className={(isMobile === true ? 'mobile' : '')}>
        <AlternativeSkyCanvas style={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            zIndex: '-1',
        }}/>
        <App/>
    </div>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
