import React from 'react';
import '../css/SmallNotification.css';

function SmallNotification(props) {
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
                    {props.value.length > 40 ? props.value.substring(0, 40) + "..." : props.value}
                </div>
            </div>
        </button>
    )
}

export default SmallNotification;