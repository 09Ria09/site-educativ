import React, { useEffect } from 'react';
import '../../css/SmallNotification.css';

function SmallNotification(props) {
    let s = ''
    let text = JSON.parse(props.value);
    for (let x of text) {
        let k = x['children'][0];
        if(k['children'] != undefined)
            k = k['children'][0];
        if (k['text'] != 'undefined') 
            s += (k['text']);
    }


    if (props.value === undefined || props.value === '')
        return ('');
    return (
        <button className={'notVisible'} onClick={() => props.clicked(props.dictionary)}>
            <div className={'smallNotificationContainer'}>
                <div className={'smallNotificationName'}>
                    {props.img == null ? <img className={'smallNotificationImage'} src={"placeholder.jpg"}/> :
                        <img className={'smallNotificationImage'} src={props.img}/>}
                    <div className={'smallNotificationNameContainer'}>
                        <div className={'smallNotificationNameText'}>
                            {props.name}
                        </div>
                        <div className={'smallNotificationNameTime'}>
                            <p className={'smallNotificationTime'}> acum {' ' + props.time} </p>
                        </div>
                    </div>
                </div>
                <div className={"smallNotificationText"}>
                    {s.length > 40 ? s.substring(0, 40) + "..." : s}
                </div>
            </div>
        </button>
    )
}

export default SmallNotification;