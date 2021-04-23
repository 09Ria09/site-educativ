import React from 'react';
import '../css/BigNotification.css';

function BigNotification(props) {
    return (
        <div className={'bigNotificationContainer'}>
            <div className={'bigNotificationName'}>
                {props.img == null ? props.name || props.value ?
                    <img className={'bigNotificationImage'} src={"placeholder.jpg"}/> : '' :
                    <img className={'bigNotificationImage'} src={props.img}/>}
                {props.name}
            </div>
            <div className={"bigNotificationText"}>
                {props.value}
            </div>
        </div>
    )
}

export default BigNotification;