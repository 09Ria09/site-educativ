import React, {useEffect, useState} from 'react';
import '../../css/Sign.css';
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";

function ChangePassword() {
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
    let history = useHistory();
    const [errors, setErrors] = useState({
        passwordInvalid: false,
        passwordMismatch: false
    });

    useEffect(() => {
        if (success === true)
            setTimeout(() => setRedirect(true), 3000);
    }, [success])

    if (redirect)
        return (<Redirect to='/'/>);

    if (success)
        return (<div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Parolă Nouă</h1>
                <p>Parola ți-a fost schimbată cu succes. Vei fi redirecționat la pagina principală în câteva
                    secunde.</p>
            </div>
        </div>)

    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Parolă Nouă</h1>
                <form method={'post'} onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    console.log(history.location.pathname)
                    axios({
                        method: 'post',
                        url: history.location.pathname,
                        data: data
                    }).then(res => {
                        let tmp = JSON.parse(res.request.response);
                        if (tmp.success) {
                            setSuccess(true);
                        }
                        setErrors(tmp.erori);
                    })
                }}>
                    <input name="password" className={'un'} type={'password'}
                           placeholder='Parola'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordInvalid'] === true ? 'unset' : 'none')}}>Parola
                        este invalidă.</p>
                    <input name="passwordAgain" className={'un'} type={'password'}
                           placeholder='Parola încă odată'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordMismatch'] === true ? 'unset' : 'none')}}>Parolele sunt
                        diferite.</p>
                    <input className={'submit'} type={'submit'} value={'Schimbă Parola'}/>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;