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
            <div className={'profileContainerContainer'}>
                <div className={'profileContainer'}>
                    <article className={'profile'}>
                        <h1><TextEdit type={'input'} where={'username'} maxlength={16} text={profile['username']}/></h1>
                        <h2>{profile['prenume'] + ' ' + profile['nume']}</h2>
                        <h3>{profile['mail']}</h3>
                        <TextEdit type={'textarea'} where={'descriere'} maxlength={2048} text={profile['descriere']}/>
                    </article>
                </div>
            </div>
        );
    else return (
            <article className={'person'}>loading</article>
        );
}

export default Profile;