import React, {useEffect, useState} from "react";
import axios from 'axios';
import '../css/Loading.css';
import '../css/Notifications.css'
import SmallNotification from "./SmallNotification";
import BigNotification from "./BigNotification";
import Loading from './Loading'

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(true);
    const [bigNotification, setBigNotification] = useState([]);

    useEffect(() => update({}), []);

    function update(filters) {
        setWaitingResponse(true);
        axios({
            method: 'post',
            url: '/GetNotifications',
            data: filters
        }).then(res => {
            setNotifications(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }
  
    if(waitingResponse === true)
        return  (
    
        <div className='bg'>
        <div className='smallContainer'> 
            {notifications === null ? ('') :
                notifications.map((x, y, imgurl) => {
                    return ( 
                        <SmallNotification name={x.length > 40 ? x.substring(0, 40) : x} value={y.length > 40 ? y.substring(0, 40) + "..." : y} img={imgurl} clicked={setBigNotification}/>
                    );
                })
            }
            <SmallNotification name="John Doe" value={"ai primit o notificare prea lunga deschide-o pe toata ca sa o vezi"} clicked={setBigNotification}/>
            <SmallNotification name="Tony Stark" value={"ai am airon men"} img={"placeholder1.jpg"} clicked={setBigNotification}/>
        </div>
        <div className='bigContainer'> 
            <BigNotification name={bigNotification[0]} value={bigNotification[1]} img={bigNotification[2]} />
        </div>
        </div>

        )
    else
        return (
        <div className='bg'>
            <div className='smallContainer'> 
                <Loading />
            </div>
            <div className='bigContainer'> 
                <Loading />
            </div>
        </div>
        )
}

export default Notifications;