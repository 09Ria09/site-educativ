import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import '../../css/Home/Content.css';

function Content(props) {
    return (
        <div className={'contentContainer contentContainer' + props.type} style={props.style}>
            <div /*className={'rellax'}*/>
                <ScrollAnimation animateIn={'animate__fadeIn'} animateOnce={true} duration={0.4}>
                    <article className={'content'} style={props.innerStyle}>{props.children}</article>
                </ScrollAnimation>
            </div>
        </div>
    );
}

export default Content;