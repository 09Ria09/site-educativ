import React, {useCallback, useEffect, useMemo, useState} from 'react';
import isHotkey from 'is-hotkey';
import {Editable, Slate, useSlate, withReact} from 'slate-react';
import {createEditor, Editor, Transforms} from 'slate';
import {withHistory} from 'slate-history';
import Button from './Slate/CustomButton';
import Toolbar from './Slate/ToolBar';

const Hotkeys = {'mod+`': 'code', 'mod+i': 'italic', 'mod+u': 'underline', 'mod+b': 'bold'};

const ListTypes = ['numbered-list', 'bulleted-list'];

function TextBox(props) {
    const [text, setText] = useState(props.initialValue);
    const [onFocus, setOnFocus] = useState(false);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    useEffect(() => {
        props.setValue(text);
    }, [text]);

    useEffect(() => {
        props.onFocus(onFocus);
    }, [onFocus]);

    return (
        <Slate value={text} editor={editor} onChange={text => setText(text)}
               className={(onFocus === true ? ' textareaEditorOnFocus' : '')}>

            <Toolbar style={{display: (props.readOnly === true ? 'none' : 'unset')}}>
                <MButton format='bold' icon='ri-bold'/>
                <MButton format='italic' icon='ri-italic'/>
                <MButton format='underline' icon='ri-underline'/>
                <MButton format='code' icon='ri-code-view'/>
                <BButton format='heading-one' icon='ri-h-1'/>
                <BButton format='heading-two' icon='ri-h-2'/>
                <BButton format='numbered-list' icon='ri-list-ordered'/>
                <BButton format='bulleted-list' icon='ri-list-unordered'/>
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder={props.placeholder}
                spellCheck
                readOnly={props.readOnly}
                onFocus={() => {
                    if (props.readOnly === false) setTimeout(() => setOnFocus(true), 2);
                }}
                onBlur={() => {
                    setTimeout(() => setOnFocus(false), 2);
                }}
                onKeyDown={event => {
                    for (const hotkey in Hotkeys) {
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark = Hotkeys[hotkey];
                            toggleM(editor, mark);
                        }
                    }
                }}
            />

        </Slate>
    )
}

function Element({element, children, attributes}) {
    if (element.type === 'block-quote') {
        return <blockquote {...attributes}> {children} </blockquote>;
    } else if (element.type === 'bulleted-list') {
        return <ul {...attributes}>{children}</ul>;
    } else if (element.type === 'heading-one') {
        return <h1 {...attributes}>{children}</h1>;
    } else if (element.type === 'heading-two') {
        return <h2 {...attributes}>{children}</h2>;
    } else if (element.type === 'list-item') {
        return <li {...attributes}>{children}</li>;
    } else if (element.type === 'numbered-list') {
        return <ol {...attributes}>{children}</ol>;
    } else {
        return <p {...attributes}>{children}</p>;
    }
}

function Leaf({attributes, children, leaf}) {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }
    if (leaf.code) {
        children = <code>{children}</code>;
    }
    if (leaf.italic) {
        children = <em>{children}</em>;
    }
    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
}

function isBActive(editor, format) {
    const [match] = Editor.nodes(editor, {match: n => n.type === format});
    return (match !== undefined);
}

function toggleB(editor, format) {
    const isActive = isBActive(editor, format);
    const isList = ListTypes.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => ListTypes.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: (isActive ? 'paragraph' : (isList ? 'list-item' : format))
    });

    if (!isActive && isList) {
        const block = {type: format, children: []};
        Transforms.wrapNodes(editor, block);
    }
}


function BButton({format, icon}) {
    const editor = useSlate();
    return (
        <Button active={isBActive(editor, format)} onMouseDown={event => {
            event.preventDefault();
            toggleB(editor, format);
        }}>
            <i className={icon + ' TextBoxIcon'}/>
            {/*<Icon>{icon}</Icon>*/}
        </Button>
    )
}

function isMActive(editor, format) {
    const marks = Editor.marks(editor);
    if (marks) {
        return marks[format] === true;
    } else {
        return false;
    }
}

function toggleM(editor, format) {
    const isActive = isMActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
}

function MButton({format, icon}) {
    const editor = useSlate();
    return (
        <Button active={isMActive(editor, format)} onMouseDown={event => {
            event.preventDefault();
            toggleM(editor, format);
        }}>
            <i className={icon + ' TextBoxIcon'}/>
            {/*<Icon>{icon}</Icon>*/}
        </Button>
    );
}

export default TextBox;