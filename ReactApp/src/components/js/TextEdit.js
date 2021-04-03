import React, {useEffect, useRef, useState} from "react";
import '../css/TextEdit.css';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";

function TextEdit(props) {
    const [editing, setEditing] = useState(false)
    const [oldValue, setOldValue] = useState(props.text)
    const [value, setValue] = useState(initTextEdit)
    const [errors, setErrors] = useState({invalid: ''});
    const textRef = useRef(null);

    function initTextEdit() {
        if (props.type !== 'textarea')
            return props.text;
        const blocksFromHtml = htmlToDraft(props.text);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    }

    useEffect(() => {
        return;
        if (editing === true) {
            textRef.current.selectionStart = textRef.current.value.length;
            textRef.current.selectionEnd = textRef.current.value.length;
        }
    }, [editing])

    useEffect(() => {
        console.log(value);
    }, [value])

    useEffect(() => {
        if (errors['invalid'] === '')
            setEditing(false)
    }, [errors])

    return (
        <React.Fragment>
            <div className={'textContainer' + (props.type === 'textarea' ? ' textareaContainer' : ' inputContainer')}>
                <a className={'cogwheelContainer'} onClick={() => {
                    if (editing === true) {
                        if ((props.type === 'input' && value === oldValue) || (props.type === 'textarea' && oldValue === draftToHtml(convertToRaw(value.getCurrentContent())))) {
                            setEditing(false);
                            setErrors({'invalid': ''});
                            return;
                        }
                        axios({
                            method: 'post',
                            url: '/SubmitTextEdit',
                            data: {
                                'type': props.where,
                                'value': (props.type === 'input' ? value : draftToHtml(convertToRaw(value.getCurrentContent())))
                            }
                        }).then(res => setErrors(JSON.parse(res.request.response)))
                        if (props.type === 'input')
                            setOldValue(value)
                        else setOldValue(draftToHtml(convertToRaw(value.getCurrentContent())));
                    } else setEditing(true)
                }}>
                    <img className={'cogwheel'} src={'cogwheel.png'} alt={'edit'}/></a>
                {editing === false ? (
                    props.type === 'textarea' ?
                        (
                            <div>{ReactHtmlParser(draftToHtml(convertToRaw(value.getCurrentContent())))}</div>
                        ) : (
                            <p className={'settled'}>{value}</p>
                        )
                ) : (
                    props.type === 'textarea' ? (
                        <Editor wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="textareaToolbar"
                                editorState={value}
                                onEditorStateChange={event => setValue(event)}
                                toolbarOnFocus
                        />
                    ) : (
                        <input autoFocus ref={textRef} value={value} maxLength={props.maxlength} onChange={(event) =>
                            setValue(event.target.value)}/>
                    ))}
            </div>
            <p className={'textErrors'}
               style={{display: (errors['invalid'] === '' ? 'none' : '')}}>{errors['invalid']}</p>
        </React.Fragment>
    );
}

export default TextEdit;