import React from 'react';
import '../css/Sign.css';

function ForgotPassword() {

    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Ai uitat parola?</h1>
                <p>Vei primi un email conținând toate instrucțiunile pentru a-ți reseta parola.</p>
                <form action={'#/forgotPassword'} method={'post'}>
                    <input className={'un'} type={'text'}
                           placeholder='Email'/>
                    <input className={'submit'} type={'submit'} value={'Trimite Email'}/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;