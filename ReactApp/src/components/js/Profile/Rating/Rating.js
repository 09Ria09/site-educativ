import React, {useEffect, useState} from "react";
import Star from "./Star";
import axios from "axios";

function Rating(props) {
    const [stars, setStars] = useState([]);
    const [rating, setRating] = useState(props.rating);
    const [hv, setHV] = useState(-1);
    const [active, setActive] = useState(props.active);
    useEffect(() => console.log(hv), [hv])

    useEffect(() => {
        let r = rating;
        let tmp = [];
        for (let i = 0; i < 5; ++i) {
            let t;
            if (r >= 0.99)
                t = 'f';
            else if (r >= 0.49)
                t = 'h';
            else t = 'e';
            tmp.push(t);
            r -= 1;
        }
        setStars(tmp);
    }, [rating]);

    function oml(e) {
        if (active === undefined)
            return;
        setHV(-1);
    }

    function oc(e) {
        if (active === undefined)
            return;
        setRating(hv);
        axios({
            method: 'post',
            url: '/RateSubmit',
            data: {rating: hv, uid: props.id}
        });
    }

    return (
        <div style={{height: '28px', overflow: 'hidden', marginTop: '10px', marginBottom: '10px'}} onMouseLeave={oml}
             onClick={oc}>{stars.map((x, y) => {
            return (<Star active={active} key={y} id={y} hv={hv} setHV={setHV} type={x}/>);
        })}
        </div>);
}

export default Rating;