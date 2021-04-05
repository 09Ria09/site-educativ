import React, {useEffect, useState} from "react";
import Select from "react-select";


function CustomSelect(props) {
    const [value, setValue] = useState([]);
    const [errors, setErrors] = useState('');
    useEffect(() => {
        let tmp = [];
        if (props.initialValue !== undefined && props.initialValue !== null)
            JSON.parse(props.initialValue).forEach((x, y) => {
                props.options.forEach((z, w) => {
                    if (x === z['value'])
                        tmp.push(z);
                })
            })
        setValue(tmp)
    }, []);

    useEffect(() => {
        if (props.setValue === undefined)
            return
        let tmp = [];
        value.forEach((x, y) => tmp.push(x['value']))
        if (props.setValue !== undefined)
            props.setValue(props.name, tmp);
    }, [value])

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    const styles = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            // transform: (props.upsideDown===true?'rotate(180deg)':''),
            color: 'rgb(var(--mantis))',
            "&:hover": {
                color: 'rgba(var(--mantis), 0.4)'
            }
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            transform: 'rotate(180deg)',
            color: 'rgb(var(--mantis))',
            "&:hover": {
                color: 'rgba(var(--mantis), 0.4)'
            }
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            backgroundColor: '#1f1d4c'
        }),
        container: (provided, state) => ({
            ...provided,
            marginLeft: props.marginOffset,
            marginRight: props.marginOffset
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            paddingLeft: '2px',
            paddingRight: '2px'
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#070d1d',
            webkitBoxShadow: (state.isFocused === true ? '0 0 0 3px #1f1d4c !important' : ''),
            boxShadow: (state.isFocused === true ? '0 0 0 3px #1f1d4c !important' : ''),
            border: 'none',
            borderRadius: '20px'
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'rgb(var(--columbiablue))',
            marginLeft: '15px'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: 'rgba(var(--columbiablue),0.5)',
            marginLeft: '15px'
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: '#070d1d',
            webkitBoxShadow: '0 0 0 3px #1f1d4c !important',
            boxShadow: '0 0 0 3px #1f1d4c !important',
            borderRadius: '20px',
            overflow: 'hidden'
        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: '0'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: (state.isFocused === true ? 'rgb(var(--oxfordblue))' : ''),
            paddingLeft: '15px',
            paddingRight: '15px'
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(var(--darkslateblue))',
            width: 'max-content',
            borderRadius: '25px',
            paddingLeft: '10px'
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            transitionDuration: '100ms',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
            padding: '8px 8px',
            "&:hover": {
                backgroundColor: 'rgb(var(--columbiablue))',
                color: 'rgb(var(--oxfordblue))'
            }
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            alignSelf: 'center',
            marginRight: '2px',
            color: 'rgb(var(--columbiablue))'
        })
    }
    if (props.editing === true)
        return (
            <React.Fragment>
                <Select
                    // components={makeAnimated()}
                    value={value}
                    onChange={(e) => setValue(e)}
                    options={props.options}
                    menuPlacement={'auto'}
                    placeholder={props.placeholder != null ? props.placeholder : 'Select...'}
                    styles={styles}
                    isMulti/>
                <p style={{
                    display: (errors === '' ? 'none' : ''),
                    marginTop: '3px',
                    fontSize: 'medium',
                    fontWeight: 'normal'
                }}>{errors}</p>
            </React.Fragment>
        );
    else
        return (<div style={{display: 'flex'}}>
            <span style={{whiteSpace: 'nowrap', marginRight: '5px'}}>Știu foarte bine: </span>
            <span>{value.map((x, y) => (<span style={{
                margin: '2px',
                padding: '6px 10px',
                backgroundColor: 'rgb(var(--darkslateblue))',
                borderRadius: '25px',
                fontSize: '85%',
                display: 'inline-block'
            }}>{x['label']}</span>))}
            </span></div>);
}

export default CustomSelect;