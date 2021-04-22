import React, {useState} from 'react';
import '../../css/Sign.css';
import axios from "axios";

function ForgotPassword() {
    const [emailSent, setEmailSent] = useState(false);
    const [errors, setErrors] = useState(null);

    if (emailSent === true)
        return (
            <div className={'signContainer'}>
                <div className={'signMain'}>
                    <h1 className={'sign'}>Ai uitat parola?</h1>
                    <p>Ți-a fost trimis un email conținând toate instrucțiunile pentru a-ți reseta parola.</p>
                </div>
            </div>
        );
    return (
        <div className={'signContainer'}>
            <div className={'signMain'}>
                <h1 className={'sign'}>Ai uitat parola?</h1>
                <p>Vei primi un email conținând toate instrucțiunile pentru a-ți reseta parola.</p>
                <form method={'post'} onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.target);
                    axios({
                        method: 'post',
                        url: '/ForgotPassword/',
                        data: data
                    }).then(res => {
                        let tmp = JSON.parse(res.request.response);
                        if (tmp.success) {
                            setEmailSent(true);
                        }
                        setErrors(tmp.erori);
                    })
                }}>
                    <input className={'un'} type={'text'} name={'email'}
                           placeholder='Email'/>
                    <p className={'errors'} style={{display: (errors !== null ? 'unset' : 'none')}}>{errors}</p>
                    <input className={'submit'} type={'submit'} value={'Trimite Email'}/>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;