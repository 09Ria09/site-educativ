import React from "react";
import '../css/Filter.css';

function Filter() {

    return (
        <div className={'filter'}>
            <h3>Filtru : </h3>
            <h4>Materie</h4>
            <div>
                <label><input type="checkbox" value="biologie" name="materie"/> Biologie</label>
                <label><input type="checkbox" value="chimie" name="materie"/> Chimie</label>
                <label><input type="checkbox" value="informatica" name="materie"/> Informatică</label>
                <label><input type="checkbox" value="limbaRomana" name="materie"/> Limba Română</label>
                <label><input type="checkbox" value="mate" name="materie"/> Mate</label>
            </div>
            <h4>Clasa</h4>
            <div>
                <label><input type="radio" value="5" name="clasa"/> Clasa a V-a</label>
                <label><input type="radio" value="6" name="clasa"/> Clasa a VI-a</label>
                <label><input type="radio" value="7" name="clasa"/> Clasa a VII-a</label>
                <label><input type="radio" value="8" name="clasa"/> Clasa a VIII-a</label>
                <label><input type="radio" value="9" name="clasa"/> Clasa a IX-a</label>
                <label><input type="radio" value="10" name="clasa"/> Clasa a X-a</label>
                <label><input type="radio" value="11" name="clasa"/> Clasa a XI-a</label>
                <label><input type="radio" value="12" name="clasa"/> Clasa a XII-a</label>
            </div>
            <div className={'applyFilters btn'}>Apply</div>
        </div>
    );
}

export default Filter;