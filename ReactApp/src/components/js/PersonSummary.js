import React from "react";
import '../css/PersonSummary.css';

function PersonSummary(props) {
    return (
        <article className={'person'}>
            <h1>{props.name}</h1>
            <p>{props.children}</p>
        </article>
    );
}

export default PersonSummary;