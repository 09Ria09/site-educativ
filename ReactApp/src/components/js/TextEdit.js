import React, {useEffect, useRef, useState} from "react";
import '../css/TextEdit.css';
import axios from "axios";

function TextEdit(props) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(props.text)
    const [errors, setErrors] = useState({invalid: ''});
    const textRef = useRef(null);

    useEffect(() => {
        if (editing === true) {
            textRef.current.selectionStart = textRef.current.value.length;
            textRef.current.selectionEnd = textRef.current.value.length;
        }
    }, [editing])

    useEffect(() => {
        if (errors['invalid'] === '')
            setEditing(false)
    }, [errors])

    return (
        <React.Fragment>
            <div className={'textContainer' + (props.type === 'textarea' ? ' textareaContainer' : ' inputContainer')}>
                <a className={'cogwheelContainer'} onClick={() => {
                    if (editing === true) {
                        if (value === props.text) {
                            setEditing(false);
                            setErrors({'invalid': ''});
                            return;
                        }
                        axios({
                            method: 'post',
                            url: '/SubmitTextarea',
                            data: {'type': props.where, 'value': value}
                        }).then(res => setErrors(JSON.parse(res.request.response)))
                    } else setEditing(true)
                }}>
                    <img className={'cogwheel'} src={'cogwheel.png'} alt={'edit'}/></a>
                {editing === false ? (
                    <p className={'settled'}>{value}</p>
                ) : (
                    props.type === 'textarea' ? (
                        <textarea autoFocus ref={textRef} value={value} onChange={(event) =>
                            setValue(event.target.value)}/>
                    ) : (
                        <input autoFocus ref={textRef} value={value} onChange={(event) =>
                            setValue(event.target.value)}/>
                    ))}
            </div>
            <p className={'textErrors'}
               style={{display: (errors['invalid'] === '' ? 'none' : '')}}>{errors['invalid']}</p>
        </React.Fragment>
    );
}

export default TextEdit;