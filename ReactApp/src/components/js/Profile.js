import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";
import '../css/Profile.css';

function Profile(props) {
    const [profile, setProfile] = useState({});
    const [waitingResponse, setWaitingResponse] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/GetProfile'
        }).then(res => {
            setProfile(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }, []);

    if (props.signedIn === false)
        return (<Redirect to='/signUp'/>);
    else if (waitingResponse === false)
        return (
            <article className={'profile'}>
                <h1>{profile['username']}</h1>
                <h3>{profile['prenume'] + ' ' + profile['nume']}</h3>
                <h4>{profile['mail']}</h4>
            </article>
        );
    else return (
            <article className={'person'}>loading</article>
        );
}

export default Profile;