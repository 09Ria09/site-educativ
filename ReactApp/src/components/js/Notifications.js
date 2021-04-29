import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../css/Loading.css';
import '../css/Notifications.css'
import SmallNotification from "./SmallNotification";
import BigNotification from "./BigNotification";
import Loading from './Loading'
import {Redirect} from "react-router-dom";

function Notifications(props) {
    const [notifications, setNotifications] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(true);
    const [bigNotification, setBigNotification] = useState([]);

    useEffect(() => update({}), []);

    function update() {
        setWaitingResponse(true);
        axios({
            method: 'post',
            url: '/GetNotifications',
        }).then(res => {
            setNotifications(JSON.parse(res.request.response))
            setWaitingResponse(false)
            if (JSON.parse(res.request.response) !== null) {
                setBigNotification(JSON.parse(res.request.response)[0]);
            }
        });
    }


    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    if (props.completedProfile === 0)
        return (<Redirect to='/Profile'/>);

    if (waitingResponse === true)
        return (
            <div className='bg'>
                <Loading/>
            </div>
        )
    else if (notifications === null || notifications.length === 0)
        return (
            <div className='bg' style={{
                display: 'flex',
                color: 'rgb(var(--columbiablue))',
                fontSize: '1.5em',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h1>Nu ai notificări.</h1>
            </div>
        );
    else
        return (
            <div className='bg'>
                <div className='smallContainer'>
                    {notifications === null ? ('') :
                        notifications.map((x) => {
                            return (
                                <SmallNotification name={x['sender'].length > 40 ? x.substring(0, 40) : x['sender']}
                                                   value={x['message']} time={x['delta']}
                                                   clicked={setBigNotification} dictionary={x} img={x['icon']}/>
                        );
                    })
                }
            </div>
            {
                <div className='bigContainer'>
                    <BigNotification name={bigNotification['sender']} value={bigNotification['message']}
                                     img={bigNotification['icon']} time={bigNotification['time']}
                                     id={bigNotification['id']}/>
                </div>
            }
        </div>

    )

}

export default Notifications;