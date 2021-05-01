import React, {useEffect, useState} from 'react';
import '../../css/Sign.css';
import axios from "axios";
import {Redirect, useHistory} from "react-router-dom";

function ChangePassword() {
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(null);
    let history = useHistory();
    const [errors, setErrors] = useState({
        passwordInvalid: false,
        passwordMismatch: false
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: history.location.pathname
        }).then(res => {
            let tmp = JSON.parse(res.request.response);
            if (tmp.erori['tokenExpirat'] === true)
                setErrors((e) => {
                    e['tokenExpirat'] = true;
                    return e;
                })
        })
    }, [])

    useEffect(() => {
        if (success === true)
            setTimeout(() => setRedirect('/'), 3000);
    }, [success])

    useEffect(() => {
        if (errors['tokenExpirat'] === true)
            setTimeout(() => setRedirect('/forgotPassword'), 3000);
    }, [errors])

    if (redirect !== null)
        return (<Redirect to={redirect}/>);

    if (success)
        return (<div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Parolă Nouă</h1>
                <p>Parola ți-a fost schimbată cu succes. Vei fi redirecționat la pagina principală în câteva
                    secunde.</p>
            </div>
        </div>)

    if (errors['tokenExpirat'] === true)
        return (<div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Parolă Nouă</h1>
                <p>Token-ul este expirat. Cereți o schimbare de parola din nou.</p>
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
                       style={{display: (errors['passwordInvalid'] === true ? 'block' : 'none')}}>Parola
                        este invalidă.</p>
                    <input name="passwordAgain" className={'un'} type={'password'}
                           placeholder='Parola încă odată'/>
                    <p className={'errors'}
                       style={{display: (errors['passwordMismatch'] === true ? 'block' : 'none')}}>Parolele sunt
                        diferite.</p>
                    <input className={'submit'} type={'submit'} value={'Schimbă Parola'}/>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;