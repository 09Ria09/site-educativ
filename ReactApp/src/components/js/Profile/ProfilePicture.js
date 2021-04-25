import React, {useEffect, useRef, useState} from "react";
import '../../css/Profile/Post.css';

function AddFiles(props) {
    const [value, setValue] = useState(null);
    const [url, setURL] = useState(props.url);
    const ref = useRef();

    useEffect(() => {
        if (value === null)
            return;
        props.setValue(value);
        setURL(URL.createObjectURL(value))
    }, [value])

    function valueHandler(event) {
        setValue(event.target.files[0]);
    }

    function resetInput() {
        ref.current.value = '';
        setURL(props.url)
        setValue(null);
    }

    if (props.editing)
        return (
            <div className={'profilePicture'}>
                <img className={'addIcon addIconModified'} src={'image-add-line.png'} style={{zIndex: 5}}
                     alt={'Schimbă Imaginea de Profil'}/>
                <input ref={ref} type={'file'} onChange={valueHandler} accept={'image/x-png,image/gif,image/jpeg'}
                       name={'icon'}/>
                {
                    <img className={'imagesSelected'} src={url}/>}
                {value !== null ? (<button onClick={resetInput}><img
                    src={'close-circle-line.png'} alt={'Șterge Imaginea de Profil'}/></button>) : ''}
            </div>
        );
    else return (<img className={'profileImg'} src={url}/>)
}

export default React.memo(AddFiles);