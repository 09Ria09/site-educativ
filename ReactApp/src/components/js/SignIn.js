import React from 'react';
import '../css/Sign.css';
import {Link} from 'react-router-dom';

function SignIn() {

    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Sign In</h1>
                <form action={'#/signIn'} method={'post'}>
                    <input className={'un'} type={'text'}
                           placeholder='Username sau Email'/>
                    <input className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <input className={'submit'} type={'submit'} value={'Sign In'}/>
                    <Link className={'forgot'} to={'/forgotPassword'}>Ai uitat parola?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignIn;