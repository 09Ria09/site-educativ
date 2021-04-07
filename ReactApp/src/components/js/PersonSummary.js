import React from "react";
import '../css/PersonSummary.css';

function PersonSummary(props) {
    return (
        <article className={'person'}>
            <div className={'personDiv1'}>
                <h1>{props.name}</h1>
                <img src={props.image}/>
            </div>
            <div className={'personChildren'}>{props.children}</div>
            <div className={'personDiv2'}>
                <div/>
                <button className={'btn personButton'}>Invită</button>
                <button className={'btn personButton'}>Ascunde</button>
                <button className={'btn personButton'}>Raportează</button>
                <div/>
            </div>
        </article>
    );
}

export default PersonSummary;