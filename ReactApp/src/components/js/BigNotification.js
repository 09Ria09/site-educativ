import React from 'react';
import '../css/BigNotification.css';

function BigNotification(props) {
    return (
        <div className={'bigNotificationContainer'}>
            <div className={'bigNotificationName'}>
                {props.img == null ? props.name || props.value ?
                    <img className={'bigNotificationImage'} src={"placeholder.jpg"}/> : '' :
                    <img className={'bigNotificationImage'} src={props.img}/>}
                <div>
                    {props.name}
                    <p className={'bigNotificationDate'}> {props.time} </p>
                </div>
            </div>
            <div className={"bigNotificationText"}>
                {props.value}
            </div>
        </div>
    )
}

export default BigNotification;