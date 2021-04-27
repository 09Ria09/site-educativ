import React from 'react';
import '../css/BigNotification.css';
import {Link} from "react-router-dom";
import TextEdit from './Profile/TextEdit'

function BigNotification(props) {
    console.log(typeof(props.value))
    if(props.value != null)
        console.log(JSON.parse(props.value))
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
                    <Link className={'btn respond'} to={'/chat/' + props.id}> Răspunde </Link>
                    : ('')
                }
            </div>
            <div className={"bigNotificationText"}>
                {
                    props.value != null ?
                        <TextEdit editing={false} type={'textarea'} initialValue={props.value}/>
                    : ('')
                }
            </div>
        </div>
    )
}

export default BigNotification;