import React from 'react';
import '../css/BigNotification.css';
import {Link} from "react-router-dom";

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
                {
                    props.name ?
                    <Link className={'respond'} to={'/chat/' + props.id}> Răspunde </Link> 
                    : ('')
                }
            </div>
            <div className={"bigNotificationText"}>
                {props.value}
            </div>
        </div>
    )
}

export default BigNotification;