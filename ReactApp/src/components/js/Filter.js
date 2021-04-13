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
                <CustomSelect setValue={filtersHandler}
                              placeholder={'Sortează după'} editing={true} name={'sort'} isClearable
                              isSearchable={false}
                              options={[
                                  {value: 0, label: 'Cele mai noi'},
                                  {value: 1, label: 'Cele mai vechi'},
                                  {value: 2, label: 'Rating'},
                              ]}/>
                <CustomSelect setValue={filtersHandler}
                              placeholder={'Filtrează dupa materii'} editing={true} name={'materii'} isMulti options={[
                    {value: 0, label: 'Matematică'},
                    {value: 1, label: 'Română'},
                    {value: 2, label: 'Engleză'},
                    {value: 3, label: 'Fizică'},
                    {value: 4, label: 'Biologie'},
                    {value: 5, label: 'Chimie'},
                    {value: 6, label: 'Religie'},
                    {value: 7, label: 'Germană'},
                    {value: 8, label: 'Franceză'},
                    {value: 9, label: 'Informatică'},
                    {value: 10, label: 'Geografie'},
                    {value: 11, label: 'Economie'},
                    {value: 12, label: 'Educatie Fizica'},
                    {value: 13, label: 'Educatie Financiara'},
                    
                ]}/>
                <CustomSelect setValue={filtersHandler}
                              placeholder={'Filtrează dupa clasă'} editing={true} name={'clasa'} isMulti options={[
                    {value: 5, label: '5'},
                    {value: 6, label: '6'},
                    {value: 7, label: '7'},
                    {value: 8, label: '8'},
                    {value: 9, label: '9'},
                    {value: 10, label: '10'},
                    {value: 11, label: '11'},
                    {value: 12, label: '12'}
                ]}/>
                <button className={'applyFilters btn'} onClick={() => props.filterHandler(filters)}>Apply</button>
            </div>
        </div>
    );
}

export default Filter;