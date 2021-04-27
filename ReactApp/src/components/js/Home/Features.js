import React from "react";
import '../../css/Home/Features.css';
import ScrollAnimation from "react-animate-on-scroll";

function Features() {

    function Feature(c, a, b) {
        return (
            <div className={'feature' + (c === 2 ? ' featureReverse' : '')}>
                <ScrollAnimation animateIn={(c === 1 ? 'animate__fadeInLeftBig' : 'animate__fadeInRightBig')}
                                 animateOnce={true} duration={0.4} offset={300}>
                    <img src={a}/>
                </ScrollAnimation>
                <div className={'dotAndText' + (c === 2 ? ' dotAndTextReverse' : '')}>
                    <div className={'dot'}/>
                    <ScrollAnimation animateIn={(c === 2 ? 'animate__fadeInLeftBig' : 'animate__fadeInRightBig')}
                                     animateOnce={true} duration={0.4} offset={300}>
                        <p>{b}</p>
                    </ScrollAnimation>
                </div>
            </div>);
    }

    return (
        <div className={'featuresContainer'}>
            {/*<div className={'specialDot'}/>*/}
            <div className={'features'}>
                <div className={'line'}/>
                {Feature(1, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(2, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(1, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(2, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(1, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(2, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(1, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
                {Feature(2, 'placeholder.jpg', 'Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re Re ')}
            </div>
        </div>
    );
}

export default Features;