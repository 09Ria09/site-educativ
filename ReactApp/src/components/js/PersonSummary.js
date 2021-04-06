import React from "react";
import '../css/PersonSummary.css';

function PersonSummary(props) {
    return (
        <article className={'person'}>
            <div className={'personDiv1'}>
                <h1>{props.name}</h1>
                <img src={props.image}/>
            </div>
            <p>{props.children}</p>
            <div className={'personDiv2'}>
                <div/>
                <button className={'btn personButton'}>Like</button>
                <button className={'btn personButton'}>Dislike</button>
                <button className={'btn personButton'}>Follow</button>
                <button className={'btn personButton'}>Block</button>
                <div/>
            </div>
        </article>
    );
}

export default PersonSummary;