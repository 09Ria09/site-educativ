import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from 'react-router-dom'
import axios from "axios";
import '../../css/Profile/Profile.css';
import TextEdit from "./TextEdit";
import CustomSelect from "../CustomSelect";
import Loading from "../Loading";
import NewPost from "./NewPost";
import ProfilePicture from "./ProfilePicture";
import Cookies from "universal-cookie";
import Posts from "./Posts";

function Profile(props) {
    let history = useHistory();
    const cookies = new Cookies();
    const [profile, setProfile] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [waitingResponse, setWaitingResponse] = useState(true);

    useEffect(() => {
        axios({
            method: 'post',
            url: history.location.pathname
        }).then(res => {
            setProfile(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }, []);

    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    if (waitingResponse === true)
        return (
            <div className={'profileContainer'}><Loading/></div>
        );
    return (
        <div className={'profileContainer'}>
            <article className={'profile'}>
                <div className={'profileFlex'}>
                    <div className={'profileFlexChild'}>
                        <h1><TextEdit type={'input'}
                                      initialValue={profile['username']}
                                      editing={false}/></h1>
                        <h2>{profile['prenume'] + ' ' + profile['nume']}</h2>
                        <h3>{profile['mail']}</h3>
                        <CustomSelect initialValue={profile['clasa']}
                                      editing={false}
                                      marginOffset={'-25px'} ikw={'Clasa: '}
                                      options={[
                                          {value: 5, label: '5'},
                                          {value: 6, label: '6'},
                                          {value: 7, label: '7'},
                                          {value: 8, label: '8'},
                                          {value: 9, label: '9'},
                                          {value: 10, label: '10'},
                                          {value: 11, label: '11'},
                                          {value: 12, label: '12'}
                                      ]}/>
                    </div>
                    <ProfilePicture preview={'img'} placeholder={'Imagini'} icon={'image-add-line.png'}
                                    editing={false}
                                    url={profile['icon']} setValue={(x) => setProfilePicture(x)} name={'images'}/>
                </div>
                <TextEdit type={'textarea'} editing={false} initialValue={profile['descriere']}/>
                <CustomSelect initialValue={profile['materii']}
                              editing={false} marginOffset={'-25px'} ikw={'Știu foarte bine: '}
                              isMulti options={[
                    {value: 0, label: 'Matematică'},
                    {value: 1, label: 'Română'},
                    {value: 2, label: 'Engleză'},
                    {value: 3, label: 'Fizică'},
                    {value: 4, label: 'Biologie'},
                    {value: 5, label: 'Chimie'},
                    {value: 6, label: 'Religie'},
                    {value: 7, label: 'Germană'},
                    {value: 8, label: 'Franceză'},
                    {value: 9, label: 'Informatică'},
                    {value: 10, label: 'Geografie'},
                    {value: 11, label: 'Economie'},
                    {value: 12, label: 'Educatie Fizica'},
                    {value: 13, label: 'Educatie Financiara'},
                ]}/>
            </article>
            <NewPost/>
            <Posts id={profile['id']}/>
        </div>
    );
}

export default Profile;