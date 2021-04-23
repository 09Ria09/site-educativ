import React, {useState} from 'react';
import '../../css/Sign.css';
import {Link, Redirect} from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";

function SignIn(props) {
    const cookies = new Cookies();
    const [errors, setErrors] = useState({
        usernameInvalid: false,
        mailInvalid: false,
        passwordInvalid: false,
        mailNonexistent: false,
        wrongPassword: false
    });

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        axios({
            method: 'post',
            url: '/SignInSubmit',
            data: data

        }).then(res => {
            let tmp = JSON.parse(res.request.response);
            if (tmp.success) {

                props.setVerified(tmp.verified);
                props.setCompletedProfile(tmp.completed_profile);
                props.setSignedIn(true);
                cookies.set('verified', tmp.verified, {sameSite: true});
                cookies.set('completed-profile', tmp.completed_profile, {sameSite: true});
                cookies.set('signed-in', true, {sameSite: true});
            }
            setErrors(tmp.erori);
        });
    }

    //TODO: add cookies warning
    if (props.signedIn === true)
        return (<Redirect to='/profile'/>);
    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Sign In</h1>
                <form onSubmit={handleSubmit} method={'post'}>
                    <input name={"usernameOrEmail"} className={'un'} type={'text'}
                           placeholder='Username sau Email'/>
                    <p className={'errors'}
                       style={{display: (errors['usernameInvalid'] === true ? 'block' : 'none')}}>Username-ul este
                        invalid.</p>
                    <p className={'errors'}
                       style={{display: (errors['mailInvalid'] === true ? 'block' : 'none')}}>Email-ul
                        este invalid.</p>
                    <p className={'errors'}
                       style={{display: (errors['usernameNonexistent'] === true ? 'block' : 'none')}}>Nu
                        exista un cont cu acest username.</p>
                    <p className={'errors'}
                       style={{display: (errors['mailNonexistent'] === true ? 'block' : 'none')}}>Nu
                        exista un cont cu acest email.</p>
                    <input name="password" className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordInvalid'] === true ? 'block' : 'none')}}>Parola
                        este invalidă.</p>
                    <p className={'errors'}
                       style={{display: (errors['wrongPassword'] === true ? 'block' : 'none')}}>Parola
                        este greșită.</p>
                    <input className={'submit'} type={'submit'} value={'Sign In'}/>
                    <Link className={'forgot'} to={'/forgotPassword'}>Ai uitat parola?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn;