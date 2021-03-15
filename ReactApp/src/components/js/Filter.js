import React from "react";
import '../css/Filter.css';

function Filter() {

    return (
        <div className={'filter'}>
            <div>
                <input type="radio" value="Male" name="gender"/> Male <br/>
                <input type="radio" value="Female" name="gender"/> Female <br/>
                <input type="radio" value="Other" name="gender"/> Other
            </div>
            <div>
                <input type="radio" value="Male" name="gender"/> Male <br/>
                <input type="radio" value="Female" name="gender"/> Female <br/>
                <input type="radio" value="Other" name="gender"/> Other
            </div>
            <div>
                <input type="radio" value="Male" name="gender"/> Male <br/>
                <input type="radio" value="Female" name="gender"/> Female <br/>
                <input type="radio" value="Other" name="gender"/> Other
            </div>
        </div>
    );
}

export default Filter;