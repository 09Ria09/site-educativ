import React from 'react';
import '../css/Sign.css';
import {Link} from 'react-router-dom';

function SignUp() {

    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Sign Up</h1>
                <form action={'#/signUp'} method={'post'}>
                    <input className={'un'} type={'text'}
                           placeholder='Username'/>
                    <input className={'un'} type={'text'}
                           placeholder='Prenume'/>
                    <input className={'un'} type={'text'}
                           placeholder='Nume'/>
                    <input className={'un'} type={'text'}
                           placeholder='Email'/>
                    <input className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <input className={'un'} type={'password'}
                           placeholder='Parola încă odată'/>
                    <input className={'submit'} type={'submit'} value={'Sign Up'}/>
                    <Link className={'goToSignIn'} to={'/signIn'}>Ai deja un cont?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
