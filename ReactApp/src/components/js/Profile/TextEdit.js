import React, {useEffect, useRef, useState} from "react";
import '../../css/Profile/TextEdit.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextBox from "./TextBox";

function TextEdit(props) {
    const [value, setValue] = useState(initTextEdit);
    const [errors, setErrors] = useState(undefined);
    const [onFocus, setOnFocus] = useState(false);
    let textRef = useRef(null);

    function initTextEdit() {
        if (props.type !== 'textarea') {
            if (props.initialValue === undefined)
                return '';
            return props.initialValue;
        }
        const check = () => {
            try {
                JSON.parse(props.initialValue);
            } catch (e) {
                return false;
            }
            return true;
        };
        if (props.initialValue === undefined || props.initialValue === null || !check())
            return [{type: 'paragraph', children: [{text: ''}]}];
        return JSON.parse(props.initialValue);
    }

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    useEffect(() => {
        if (props.setValue !== undefined)
            props.setValue(props.name, value);
    }, [value]);

    useEffect(() => {
        if (onFocus === false && props.editing === true && props.onBlur !== undefined)
            props.onBlur();
    }, [onFocus]);

    return (
        <React.Fragment>
            <div
                className={'textContainer' + (props.type === 'textarea' ? ' textareaContainer' + (props.editing === false ? ' textareaEditorReadOnly' : '') + (onFocus === true ? ' textareaEditorOnFocus' : '') : ' inputContainer')}>
                {(props.editing === false && props.type === 'input') ? (
                    <p className={'settled'}>{value}</p>
                ) : (
                    props.type === 'textarea' ? (

                            <TextBox readOnly={!props.editing} name={props.name} setValue={setValue}
                                     initialValue={initTextEdit()} placeholder={props.placeholder}
                                     onFocus={(f) => setOnFocus(f)}/>
                            /**
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
                             */
                        )
                        : (
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
               style={{display: (typeof errors !== 'string' ? 'none' : 'block')}}>{errors}</p>
        </React.Fragment>
    );
}

export default TextEdit;