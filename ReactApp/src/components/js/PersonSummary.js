import React from "react";
import '../css/PersonSummary.css';

function PersonSummary(props) {
    return (
        <article className={'person'}>
            <h1>{props.name}</h1>
            <img src={props.image}/>
            <p>{props.children}</p>
            <div>
                <div className={'personButton'}>Like</div>
                <div className={'line'}/>
                <div className={'personButton'}>Dislike</div>
                <div className={'line'}/>
                <div className={'personButton'}>Follow</div>
                <div className={'line'}/>
                <div className={'personButton'}>Block</div>
            </div>
        </article>
    );
}

export default PersonSummary;