import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
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
    const cookies = new Cookies();
    const [profile, setProfile] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [waitingResponse, setWaitingResponse] = useState(true);
    const [editing, setEditing] = useState((props.completedProfile === 0));
    const [button, setButton] = useState(false);
    const [value, setValue] = useState({});
    const [errors, setErrors] = useState({valid: true});
    const [checkProfile, setCheckProfile] = useState(false);

    useEffect(() => {
        axios({
            method: 'post',
            url: '/GetProfile'
        }).then(res => {
            setProfile(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }, []);

    useEffect(() => {
        if (props.completedProfile === 0)
            setEditing(true)
    }, [props.completedProfile]);

    useEffect(() => {
        if (button === false)
            return;
        if (editing === true) {
            let tmp = new FormData();
            tmp.append('value', JSON.stringify(value))
            tmp.append('profilePicture', profilePicture)
            axios({
                method: 'post',
                url: '/SubmitProfile',
                data: tmp
            }).then(res => {
                let tmp = JSON.parse(res.request.response)
                setErrors(tmp.ver);
                props.setCompletedProfile(tmp.completed_profile);
                cookies.set('completed-profile', tmp.completed_profile, {sameSite: true});
                if (tmp.ver['valid'] === true)
                    setEditing(false)
            })
        } else if (editing === false)
            setEditing(true);
        setButton(false);
    }, [button]);

    useEffect(() => {
        if (checkProfile === false)
            return;
        axios({
            method: 'post',
            url: '/CheckProfile',
            data: value
        }).then(res => {
            let tmp = JSON.parse(res.request.response)
            setErrors(tmp)
        })
        setCheckProfile(false);
    }, [checkProfile]);

    function valueHandler(t, v) {
        setValue(s => {
            let tmp = s;
            tmp[t] = v;
            return tmp
        })
    }

    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    if (waitingResponse === true)
        return (
            <div className={'profileContainer'}><Loading/></div>
        );
    return (
        <div className={'profileContainer'}>
            <article className={'profile'}>
                <button className={'cogwheelContainer'} onClick={() => {
                    setButton(true)
                }}>
                    <img className={'cogwheel' + (editing === true ? ' rotateCogwheel' : '')}
                         src={'cogwheel.png'} alt={'edit'}/></button>
                <div className={'profileFlex'}>
                    <div className={'profileFlexChild'}>
                        <h1><TextEdit type={'input'}
                                      name={'username'}
                                      initialValue={profile['username']}
                                      setValue={valueHandler}
                                      editing={editing}
                                      errors={errors['invalidUN']}
                                      placeholder={'Username'}
                                      onBlur={() => setCheckProfile(true)}
                                      maxlength={32}/></h1>
                        <h2>{profile['prenume'] + ' ' + profile['nume']}</h2>
                        <h3>{profile['mail']}</h3>
                        <CustomSelect initialValue={profile['clasa']} setValue={valueHandler}
                                      editing={editing} errors={errors['invalidC']}
                                      marginOffset={'-25px'} name={'clasa'} ikw={'Clasa: '}
                                      placeholder={'Clasa'}
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
                                    editing={editing}
                                    url={profile['icon']} setValue={(x) => setProfilePicture(x)} name={'images'}/>
                </div>
                <TextEdit type={'textarea'}
                          name={'descriere'}
                          initialValue={profile['descriere']}
                          setValue={valueHandler}
                          editing={editing}
                          errors={errors['invalidD']}
                          placeholder={'O scurtă descriere'}
                          onBlur={() => setCheckProfile(true)}/>
                <CustomSelect initialValue={profile['materii']} setValue={valueHandler}
                              editing={editing} errors={errors['invalidM']}
                              marginOffset={'-25px'} name={'materii'} ikw={'Știu foarte bine: '}
                              placeholder={'Materii pe care le știu foarte bine'}
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