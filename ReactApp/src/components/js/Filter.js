import React from "react";
import '../css/Filter.css';

function Filter() {

    return (
        <div className={'filter'}>
            <h3>Filtru : </h3>
            <h4>Tip</h4>
            <div>
                <label><input type="radio" value="Male" name="gender"/> Male</label>
                <label><input type="radio" value="Female" name="gender"/> Female</label>
                <label><input type="radio" value="Other" name="gender"/> Other</label>
            </div>
            <h4>Tip</h4>
            <div>
                <label><input type="radio" value="Male" name="gender"/> Male</label>
                <label><input type="radio" value="Female" name="gender"/> Female</label>
                <label><input type="radio" value="Other" name="gender"/> Other</label>
            </div>
            <h4>Tip</h4>
            <div>
                <label><input type="radio" value="Male" name="gender"/> Male</label>
                <label><input type="radio" value="Female" name="gender"/> Female</label>
                <label><input type="radio" value="Other" name="gender"/> Other</label>
            </div>
            <div className={'applyFilters btn'}>Apply</div>
        </div>
    );
}

export default Filter;