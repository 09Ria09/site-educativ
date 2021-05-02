import React, {useEffect, useRef, useState} from "react";
import '../../css/Profile/Post.css';

function AddFiles(props) {
    const [value, setValue] = useState([]);
    const ref = useRef();

    useEffect(() => {
        props.setValue(props.name, value)
    }, [value])

    function valueHandler(event) {
        let tmp = [];
        for (let i = 0; i < event.target.files.length; ++i)
            tmp.push(event.target.files[i]);
        setValue(tmp)
    }

    function resetInput() {
        ref.current.value = '';
        setValue([]);
    }
    console.log(value);
    console.log('sus')
    return (
        <div className={'newPostAdd'}>
            <i className={props.icon + ' addIcon' + (value.length !== 0 ? ' addIconModified' : '')}/>
            <input ref={ref} type={'file'} onChange={valueHandler} accept={props.accept} multiple={props.multiple}/>
            {value.length === 0 ? 'Adaugă ' + props.placeholder : ''}

            {value.map((x, y) => {
                if (props.preview === 'a')
                    return (<a className={'docsSelected'} key={y} href={URL.createObjectURL(x)}
                               target={"_blank"}>{x.name}</a>)
                else if (props.preview === 'img')
                    return (
                        <img className={'imagesSelected'} key={y} src={URL.createObjectURL(x)} alt={'selected image'}/>)
                else if (props.preview === 'video')
                    return (<video className={'videoSelected'} key={y} src={URL.createObjectURL(x)} controls/>)
            })}
            <button onClick={resetInput} style={{display: (value.length !== 0 ? 'unset' : 'none')}}>
                <i style={{fontSize: '32px', color: "rgb(var(--columbiablue))"}} className="ri-close-circle-line"/>
            </button>
        </div>
    );
}

export default React.memo(AddFiles);