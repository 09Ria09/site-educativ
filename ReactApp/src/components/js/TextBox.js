import React, {useCallback, useState, useMemo} from 'react';
import isHotkey from 'is-hotkey';
import {Editable, withReact, useSlate, Slate} from 'slate-react';
import {Editor, Transforms, createEditor} from 'slate';
import {withHistory} from 'slate-history';
import Button from './CustomButton';
import Icon from './Icon';
import Toolbar from './ToolBar';

const Hotkeys = { 'mod+`' : 'code', 'mod+i' : 'italic', 'mod+u':'underline', 'mod+b':'bold' };

const ListTypes = ['numbered-list', 'bulleted-list'];

function TextBox() {
    const [text, setText] = useState(initialValue);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <Slate value = {text} editor = {editor} onChange = {text => setText(text)}>
            <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>

            <Toolbar>
                <MButton format='bold' icon='format_bold' />
                <MButton format='italic' icon='format_italic' />
                <MButton format='underline' icon='format_underlined' />
                <MButton format='code' icon='code' />
                <BButton format='heading-one' icon='looks_one' />
                <BButton format='heading-two' icon='looks_two' />
                <BButton format='numbered-list' icon='format_list_numbered' />
                <BButton format='bulleted-list' icon='format_list_bulleted' />
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder='Enter some rich text…'
                spellCheck
                autoFocus
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

const initialValue = [ { type: 'paragraph', children: [{text: ''}] } ];

function Element({element, children, attributes}) {
    if(element.type == 'block-quote') {
        return <blockquote {...attributes}> {children} </blockquote>;
    } else if (element.type == 'bulleted-list') {
        return <ul {...attributes}>{children}</ul>;
    } else if (element.type == 'heading-one') {
        return <h1 {...attributes}>{children}</h1>;
    } else if (element.type == 'heading-two') {
        return <h2 {...attributes}>{children}</h2>;
    } else if (element.type == 'list-item') {
        return <li {...attributes}>{children}</li>;
    } else if (element.type == 'numbered-list') {
        return <ol {...attributes}>{children}</ol>;
    } else {
        return <p {...attributes}>{children}</p>;
    }
}

function Leaf({ attributes, children, leaf }) {
    if (leaf.bold) {
    children = <strong>{children}</strong>;
    } if (leaf.code) {
        children = <code>{children}</code>;
    } if (leaf.italic) {
        children = <em>{children}</em>;
    } if (leaf.underline) {
        children = <u>{children}</u>;
    }
    
    return <span {...attributes}>{children}</span>;
}

function isBActive(editor, format) {
    const [match] = Editor.nodes(editor, {match: n => n.type === format});
  
    return match;
};

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
        <Button active = {isBActive(editor, format)} onMouseDown = {event => {event.preventDefault(); toggleB(editor, format);}}>
            <Icon>{icon}</Icon>
        </Button>
    )
}

function isMActive(editor, format) {
    const marks = Editor.marks(editor);
    if(marks) {
        return marks[format] === true;
    } else {
        return false;
    }
}

function toggleM(editor, format){
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
      <Button active = {isMActive(editor, format)} onMouseDown = {event => {event.preventDefault(); toggleM(editor, format);}}>
        <Icon>{icon}</Icon>
      </Button>
    );
}

export default TextBox;