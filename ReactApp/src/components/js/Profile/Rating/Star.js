import React, {useEffect, useRef, useState} from "react";

function Star(props) {
    const style = {fontSize: '28px', marginBottom: '-3.2px', marginTop: '-3.2px', display: 'inline-block'};
    const [state, setState] = useState(initState);
    const ref = useRef(null);

    useEffect(() => {
        if (props.active === undefined)
            return;
        if (props.hv === -1)
            setState(initState());
        else if (props.hv > props.id + 1)
            setState(['full star', 'ri-star-fill']);
        else if (props.hv < props.id + 1)
            setState(['empty star', 'ri-star-line']);
    }, [props.hv])

    useEffect(() => {
        setState(initState());
    }, [props.rating])

    function initState() {
        if (props.type === 'f')
            return ['full star', 'ri-star-fill'];
        else if (props.type === 'h')
            return ['half star', 'ri-star-half-line'];
        else if (props.type === 'e')
            return ['empty star', 'ri-star-line'];
    }

    function omm(e) {
        if (props.active === undefined)
            return;
        let cl = ref.current.getBoundingClientRect().left;
        let cr = ref.current.getBoundingClientRect().right;
        let mx = e.pageX;
        let offset = 0;
        if (mx < cl + (cr - cl) / 2) {
            setState(['half star', 'ri-star-half-line']);
            offset += 0.5;
        } else {
            setState(['full star', 'ri-star-fill']);
            offset += 1;
        }
        props.setHV(props.id + offset);
    }

    return (<i ref={ref} style={style} className={state[1]} onMouseMove={omm}/>);
}

export default Star;