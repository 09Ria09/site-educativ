import React, { useState } from "react";
import '../../css/Discover/PersonSummary.css';
import axios from "axios";
import {Link} from "react-router-dom";

function PersonSummary(props) {
    const [hidden, setHidden] = useState(false);
    function sendToServer(url, data) {
        let test = {};
        test['id'] = data;
        axios({
            
            method: 'post',
            url: url,
            data: test
        })
    }

    function Hide() {
        sendToServer('/Hide', props.id)
        setHidden(true);
    }
    if(hidden === false)
        return (
            <article className={'person'}>
                <div className={'personDiv1'}>
                    <h1>{props.name}</h1>
                    <h1>{props.rating}</h1>
                    <img src={typeof props.image === 'string' ? props.image : 'placeholder.jpg'}/>
                </div>
                <div className={'personChildren'}>{props.children}</div>
                <div className={'personDiv2'}>
                    <div/>
                    <Link className={'btn personButton'} to={'/chat/' + props.id}>Contactează</Link>
                    <Link className={'btn personButton'} to={'/nProfile/' + props.id}>Vezi Profil</Link>
                    <button className={'btn personButton'} onClick={Hide}>Ascunde</button>
                    <button className={'btn personButton'} onClick={() => sendToServer('/Report', props.id)}>Raportează
                    </button>
                    <div/>
                </div>
            </article>
        );
    return ('')
}

export default PersonSummary;