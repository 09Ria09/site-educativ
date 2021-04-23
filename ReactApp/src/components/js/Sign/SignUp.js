import React, {useState} from 'react';
import '../../css/Sign.css';
import {Link, Redirect} from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";

function SignUp(props) {
    const cookies = new Cookies();
    const [errors, setErrors] = useState({
        usernameInvalid: false,
        numeInvalid: false,
        prenumeInvalid: false,
        passwordInvalid: false,
        passwordMismatch: false,
        mailInvalid: false,
        usernameTaken: false,
        mailTaken: false
    });

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        axios({
            method: 'post',
            url: '/SignUpSubmit',
            data: data

        }).then(res => {
            let tmp = JSON.parse(res.request.response);
            if (tmp.success === true) {
                props.setVerified(tmp.verified);
                props.setCompletedProfile(tmp.completed_profile);
                props.setSignedIn(tmp.success);
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
                <h1 className={'sign'}>Sign Up</h1>
                <form onSubmit={handleSubmit} method={'post'}>
                    <input name="username" className={'un'} type={'text'}
                           placeholder='Username'/>
                    <p className={'errors'}
                       style={{display: (errors['usernameInvalid'] === true ? 'block' : 'none')}}>Username-ul este
                        invalid.</p>
                    <p className={'errors'}
                       style={{display: (errors['usernameTaken'] === true ? 'block' : 'none')}}>Există
                        deja un alt cont cu acest username.</p>
                    <input name="prenume" className={'un'} type={'text'}
                           placeholder='Prenume'/>
                    <p className={'errors'}
                       style={{display: (errors['prenumeInvalid'] === true ? 'block' : 'none')}}>Prenume
                        este invalid.</p>
                    <input name="nume" className={'un'} type={'text'}
                           placeholder='Nume'/>
                    <p className={'errors'}
                       style={{display: (errors['numeInvalid'] === true ? 'block' : 'none')}}>Numele
                        este invalid.</p>
                    <input name="email" className={'un'} type={'text'}
                           placeholder='Email'/>
                    <p className={'errors'}
                       style={{display: (errors['mailInvalid'] === true ? 'block' : 'none')}}>Email-ul
                        este invalid.</p>
                    <p className={'errors'} style={{display: (errors['mailTaken'] === true ? 'block' : 'none')}}>Există
                        deja
                        un alt cont cu acest email.</p>
                    <input name="password" className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordInvalid'] === true ? 'block' : 'none')}}>Parola
                        este invalidă.</p>
                    <input name="passwordAgain" className={'un'} type={'password'}
                           placeholder='Parola încă odată'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordMismatch'] === true ? 'block' : 'none')}}>Parolele sunt
                        diferite.</p>
                    <input className={'submit'} type={'submit'} value={'Sign Up'}/>
                    <Link className={'goToSignIn'} to={'/signIn'}>Ai deja un cont?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
