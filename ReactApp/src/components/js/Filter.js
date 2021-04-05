import React, {useState} from "react";
import '../css/Filter.css';
import CustomSelect from "./CustomSelect";

function Filter(props) {
    const [filters, setFilters] = useState({});

    function filtersHandler(t, v) {
        setFilters(s => {
            let tmp = s;
            tmp[t] = v;
            return tmp
        })
    }

    return (
        <div className={'filterContainer'}>
            <div className={'filter'}>
                <h3>Filtru : </h3>
                <CustomSelect setValue={filtersHandler}
                              placeholder={'Materii'} editing={true} name={'materii'} options={[
                    {value: '0', label: 'Matematică'},
                    {value: '1', label: 'Română'},
                    {value: '2', label: 'Engleză'},
                    {value: '3', label: 'Fizică'},
                    {value: '4', label: 'Biologie'},
                    {value: '5', label: 'Chimie'},
                    {value: '6', label: 'Religie'},
                    {value: '7', label: 'Germană'},
                    {value: '8', label: 'Franceză'},
                    {value: '9', label: 'Informatică'},
                    {value: '10', label: 'Geografie'},
                    {value: '11', label: 'Economie'},
                ]}/>
                <CustomSelect setValue={filtersHandler}
                              placeholder={'Clasa'} editing={true} name={'clasa'} options={[
                    {value: '5', label: '5'},
                    {value: '6', label: '6'},
                    {value: '7', label: '7'},
                    {value: '8', label: '8'},
                    {value: '9', label: '9'},
                    {value: '10', label: '10'},
                    {value: '11', label: '11'},
                    {value: '12', label: '12'}
                ]}/>
                <a className={'applyFilters btn'} onClick={() => props.filterHandler(filters)}>Apply</a>
            </div>
        </div>
    );
}

export default Filter;