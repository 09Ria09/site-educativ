import React from 'react';
import '../../css/BigNotification.css';
import {Link} from "react-router-dom";
import TextEdit from '../Profile/TextEdit'

function BigNotification(props) {

    return (
        <div className={'bigNotificationContainer'}>
            <div className={'bigNotificationName'}>
                <button className={'btn personButton goBack'} onClick={() => props.setBigNotification({})}>
                    <i className={'ri-arrow-go-back-fill'}/>
                </button>
                {props.img == null ? props.name || props.value ?
                    <img className={'bigNotificationImage'} src={"placeholder.jpg"}/> : '' :
                    <img className={'bigNotificationImage'} src={props.img}/>}
                <div className={'innerBNN'}>
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
                        <TextEdit key={props.value} editing={false} type={'textarea'} initialValue={props.value}/>
                    : ('')
                }
            </div>
        </div>
    )
}

export default BigNotification;