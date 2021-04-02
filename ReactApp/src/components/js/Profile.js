import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";
import '../css/Profile.css';
import TextEdit from "./TextEdit";

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

    console.log(props.signedIn)
    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    else if (waitingResponse === false)
        return (
            <article className={'profile'}>
                <TextEdit type={'input'} where={'username'} text={profile['username']}/>
                <h3>{profile['prenume'] + ' ' + profile['nume']}</h3>
                <h4>{profile['mail']}</h4>
                <TextEdit type={'textarea'} where={'descriere'} text={profile['descriere']}/>
            </article>
        );
    else return (
            <article className={'person'}>loading</article>
        );
}

export default Profile;