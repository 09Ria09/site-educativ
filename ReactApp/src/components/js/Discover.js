import React from "react";
import '../css/Discover.css';
import PersonSummary from "./PersonSummary";
import Filter from "./Filter";

function Discover() {

    return (
        <div style={{display: 'flex', width: 'auto'}}>
            <Filter/>
            <div className={'people'}>
                <PersonSummary name={'Felix'}>I'm a huge nerd!</PersonSummary>
                <PersonSummary name={'Michael'}>I'm a huge nerd!</PersonSummary>
                <PersonSummary name={'X Æ A-12'}>Senpai Elon!</PersonSummary>
            </div>
        </div>
    );
}

export default Discover;