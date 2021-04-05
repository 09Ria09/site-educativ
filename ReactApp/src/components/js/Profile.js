import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";
import '../css/Profile.css';
import TextEdit from "./TextEdit";
import CustomSelect from "./CustomSelect";
import Loading from "./Loading";

function Profile(props) {
    const [profile, setProfile] = useState({});
    const [waitingResponse, setWaitingResponse] = useState(true);
    const [editing, setEditing] = useState(false);
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
        if (button === false)
            return;
        if (editing === true)
            axios({
                method: 'post',
                url: '/SubmitProfile',
                data: value
            }).then(res => {
                let tmp = JSON.parse(res.request.response)
                setErrors(tmp)
                if (tmp['valid'] === true)
                    setEditing(false)
            })
        else if (editing === false)
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
    else if (waitingResponse === false)
        return (
            <div className={'profileContainerContainer'}>
                <div className={'profileContainer'}>
                    <article className={'profile'}>
                        <a className={'cogwheelContainer'} onClick={() => {
                            setButton(true)
                        }}>
                            <img className={'cogwheel' + (editing === true ? ' rotateCogwheel' : '')}
                                 src={'cogwheel.png'} alt={'edit'}/></a>
                        <h1><TextEdit type={'input'}
                                      name={'username'}
                                      initialValue={profile['username']}
                                      setValue={valueHandler}
                                      editing={editing}
                                      errors={errors['invalidUN']}
                                      onBlur={() => setCheckProfile(true)}
                                      maxlength={32}/></h1>
                        <h2>{profile['prenume'] + ' ' + profile['nume']}</h2>
                        <h3>{profile['mail']}</h3>
                        <TextEdit type={'textarea'}
                                  name={'descriere'}
                                  initialValue={profile['descriere']}
                                  setValue={valueHandler}
                                  editing={editing}
                                  errors={errors['invalidD']}
                                  onBlur={() => setCheckProfile(true)}/>
                        <CustomSelect initialValue={profile['materii']} setValue={valueHandler}
                                      editing={editing} errors={errors['invalidM']}
                                      marginOffset={'-25px'} name={'materii'} options={[
                            {value: '0', label: 'Matematică'},
                            {value: '1', label: 'Română'},
                            {value: '2', label: 'Engleză'},
                            {value: '3', label: 'Fizică'},
                            {value: '4', label: 'Biologie'},
                            {value: '5', label: 'Chimie'},
                            {value: '6', label: 'Religie'},
                            {value: '7', label: 'Germană'},
                            {value: '8', label: 'Franceză'},
                            {value: '9', label: 'Informatică'},
                            {value: '10', label: 'Geografie'},
                            {value: '11', label: 'Economie'},
                        ]}/>
                    </article>
                </div>
            </div>
        );
    else return (
            <div className={'profileContainerContainer'}>
                <div className={'profileContainer'}><Loading/>
                </div>
            </div>
        );
}

export default Profile;