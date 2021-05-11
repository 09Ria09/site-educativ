import React, {useEffect, useState} from 'react';
import {Redirect, useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import '../../css/VerifyMail.css';

function VerifyMail() {
    const history = useHistory();
    const [toRedirect, setRedirect] = useState(false)
    useEffect(() => {
        if (history.location.pathname.substring(0, 11) === '/VerifyMail') update({})
    }, [useParams()]);

    const redirect = () => {
        setRedirect(true);
    }

    const update = () => {
        axios({
            method: 'post',
            url: history.location.pathname
        })
        const interval = setInterval(redirect, 5000);
        return () => clearInterval(interval);
    }
    if(!toRedirect)
        return (
            <div className={'verifyMailContainer'}>
                <div className={'verifyMailBox'}>
                    <h1> Felicitări, contul dumneavoastră a fost validat! veți fi redirecționat în câteva secunde</h1>
                </div>
            </div>
        )
    return (<Redirect to='/'/>);
}

export default VerifyMail;