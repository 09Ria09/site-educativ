import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../css/Loading.css';
import '../css/Notifications.css'
import SmallNotification from "./SmallNotification";
import BigNotification from "./BigNotification";
import Loading from './Loading'

function Notifications() {
    const [notifications, setNotifications] = useState(null);
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
        });
    }

    if (waitingResponse === true)
        return (
             <div className='bg'>
                <div className='smallContainer'>
                    <Loading/>
                </div>
                <div className='bigContainer'>
                    <Loading/>
                </div>
            </div>
        )
    else
    return (
        <div className='bg'>
            <div className='smallContainer'>
                {notifications === null ? ('') :
                    notifications.map((x) => {
                        return (
                            <SmallNotification name={x['sender'].length > 40 ? x.substring(0, 40) : x['sender']}
                                               value={x['message'] > 40 ? x['message'].substring(0, 40) + "..." : x['message']}
                                               time={x['delta']} clicked={setBigNotification} dictionary={x} img={x['icon']}/>
                        );
                    })
                }
                {
                    //<SmallNotification name="John Doe"
                                       //value={"ai primit o notificare prea lunga deschide-o pe toata ca sa o vezi"}
                                       //clicked={setBigNotification}/>
                    //<SmallNotification name="Tony Stark" value={"ai am airon men"} img={"placeholder1.jpg"}
                                       //clicked={setBigNotification}/>
                }
            </div>
            {
                
                <div className='bigContainer'>
                    <BigNotification name={bigNotification['sender']} value={bigNotification['message']} 
                                     img={bigNotification['icon']} time={bigNotification['time']} id={bigNotification['id']}/>
                </div>
            }
        </div>

    )
        
}

export default Notifications;