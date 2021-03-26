import React from 'react';
import '../css/Sign.css';
import {Link} from 'react-router-dom';

function SignUp() {

    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Sign Up</h1>
                <form enctype="multipart/form-data" action={'/SignUpSubmit'} method={'post'}>
                    <input name="username" className={'un'} type={'text'}
                           placeholder='Username'/>
                    <input name="prenume" className={'un'} type={'text'}
                           placeholder='Prenume'/>
                    <input name="nume" className={'un'} type={'text'}
                           placeholder='Nume'/>
                    <input name="email" className={'un'} type={'text'}
                           placeholder='Email'/>
                    <input name="password" className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <input name="passwordAgain" className={'un'} type={'password'}
                           placeholder='Parola încă odată'/>
                    <input className={'submit'} type={'submit'} value={'Sign Up'}/>
                    <Link className={'goToSignIn'} to={'/signIn'}>Ai deja un cont?</Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
