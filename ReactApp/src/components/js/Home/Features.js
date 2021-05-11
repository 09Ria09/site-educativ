import React from "react";
import '../../css/Home/Features.css';
import ScrollAnimation from "react-animate-on-scroll";

function Features() {

    function Feature(c, a, b,d) {
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

                        <div><h2>{b}</h2>
                            <h3>{d}</h3></div>

                    </ScrollAnimation>
                </div>
            </div>);
    }

    return (
        <div className={'featuresContainer'}>
            {/*<div className={'specialDot'}/>*/}
            <h1>Echipa</h1>
            <div className={'features'}>
                <div className={'line'}/>
                {Feature(1, 'rares.jpg', 'Rareș Iordan', "Liceul Teoretic de Informatică \"Grigore Moisil\" Iași")}
                {Feature(2, 'noemi.jpg', 'Noemi Kulcsar', "Liceul de Informatică \"Tiberiu Popoviciu\" Cluj-Napoca")}
                {Feature(1, 'albert.jpg', 'Albert Guiman', "Colegiul Național de Informatică \"Tudor Vianu\" București")}
                {Feature(2, 'codrin.jpg', 'Codrin Crîșmariu', "Liceul Teoretic de Informatică \"Grigore Moisil\" Iași")}
                {Feature(1, 'andy.jpeg', 'Stănică Andrei', "Liceul Teoretic \"Grigore Moisil\" Timișoara")}
                {Feature(2, 'tiberius.png', 'Tiberius Dumitriu', "Mentor")}
            </div>  
        </div>
    );
}

export default Features;