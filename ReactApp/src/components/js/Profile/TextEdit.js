import React, {useEffect, useRef, useState} from "react";
import '../../css/Profile/TextEdit.css';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';

function TextEdit(props) {
    const [value, setValue] = useState(initTextEdit);
    const [errors, setErrors] = useState('');
    const [onFocus, setOnFocus] = useState(false)
    let textRef = useRef(null);

    function initTextEdit() {
        if (props.type !== 'textarea') {
            if (props.initialValue === undefined)
                return '';
            return props.initialValue;
        }
        if (props.initialValue === undefined || props.initialValue === null || JSON.parse(props.initialValue) === null)
            return EditorState.createEmpty();
        return EditorState.createWithContent(convertFromRaw(JSON.parse(props.initialValue)));
    }

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    useEffect(() => {
        if (props.type === 'input')
            props.setValue(props.name, value);
        else if (props.type === 'textarea')
            props.setValue(props.name, convertToRaw(value.getCurrentContent()));
    }, [value]);

    useEffect(() => {
        if (onFocus === false && props.editing === true && props.onBlur !== undefined)
            props.onBlur();
    }, [onFocus]);

    return (
        <React.Fragment>
            <div className={'textContainer' + (props.type === 'textarea' ? ' textareaContainer' : ' inputContainer')}>
                {(props.editing === false && props.type === 'input') ? (
                    <p className={'settled'}>{value}</p>
                ) : (
                    props.type === 'textarea' ? (
                        <Editor wrapperClassName="textareaWrapper"
                                editorClassName={"textareaEditor" + (onFocus === true ? ' textareaEditorOnFocus' : '')
                                + (props.editing === false ? ' textareaEditorReadOnly' : '')
                                }
                                toolbarClassName={"textareaToolbar" + (onFocus === true ? ' textareaToolbarOnFocus' : '')}
                                editorRef={(ref) => textRef = ref}
                                editorState={value}
                                onEditorStateChange={event => setValue(event)}
                                editorStyle={{textAlign: 'justify'}}
                                onFocus={() => (props.editing === true ? setOnFocus(true) : '')}
                                onBlur={() => setOnFocus(false)}
                                placeholder={props.placeholder}
                                readOnly={!props.editing}
                                toolbar={{
                                    options: ['inline', 'fontSize', 'list',
                                        'history', 'emoji', 'fontFamily', 'remove'],
                                }}
                        />
                    ) : (
                        <input ref={textRef}
                               value={value}
                               maxLength={props.maxlength}
                               onChange={(event) => setValue(event.target.value)}
                               onFocus={() => setOnFocus(true)}
                               onBlur={() => setOnFocus(false)}
                               placeholder={props.placeholder}
                        />
                    ))}
            </div>

            <p className={'textErrors'}
               style={{display: (errors === '' ? 'none' : 'unset')}}>{errors}</p>
        </React.Fragment>
    );
}

export default TextEdit;