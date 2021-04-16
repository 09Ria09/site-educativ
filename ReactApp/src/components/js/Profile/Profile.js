import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";
import '../../css/Profile/Profile.css';
import TextEdit from "./TextEdit";
import CustomSelect from "../CustomSelect";
import Loading from "../Loading";
import NewPost from "./NewPost";

function Profile(props) {
    const [profile, setProfile] = useState({});
    const [waitingResponse, setWaitingResponse] = useState(true);
    const [editing, setEditing] = useState((props.completedProfile === false));
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
        if (props.completedProfile === false)
            setEditing(true)
    }, [props.completedProfile]);

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
    if (waitingResponse === true)
        return (
            <div className={'profileContainerContainer'}>
                <div className={'profileContainer'}><Loading/>
                </div>
            </div>
        );
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
            </div>
        </div>
    );
}

export default Profile;