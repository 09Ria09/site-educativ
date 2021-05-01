import React from 'react';
import '../css/SmallNotification.css';

function SmallNotification(props) {

    if (props.value === undefined || props.value === '')
        return ('');

    let text = JSON.parse(props.value);
    let s = '';
    for (let x of text) {
        if (x['children'][0]['text'] != 'undefined')
            s += (x['children'][0]['text']);
    }
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