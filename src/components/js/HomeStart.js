import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import '../css/HomeStart.css';
import {Link} from "react-router-dom";


function HomeStart() {
    return (
        <div className={'homeStartContainer'}>
            <div className={'homeStart'}>
                <article className={'rellax'} data-rellax-zindex="2" style={{gridRow: '1/10', gridColumn: '1/5'}}>
                    <ScrollAnimation className={'leftSide'} animateIn={'animate__fadeIn'} animateOnce={true} delay={200}
                                     duration={0.4}>
                        <h1 className={'title'}>Brainer</h1>
                        <h2 className={'startText'}>I'm something new entirely. With my own set of rules. I'm Dexter.
                            Boo.</h2>
                        <Link className={'btn startButton'} to={'/login'}>Sign Up</Link>
                    </ScrollAnimation>
                </article>
                <div className={'rellax'} data-rellax-speed="-6" style={{gridRow: '5/10', gridColumn: '7/10'}}>
                    <ScrollAnimation className={'circle'} animateIn={'animate__fadeInRightBig'}
                                     animateOnce={true}
                                     duration={2}/>
                </div>
                <div className={'rellax'} data-rellax-zindex="1" data-rellax-speed="3"
                     style={{gridRow: '4/10', gridColumn: '8/10'}}>
                    <ScrollAnimation className={'square'}
                                     animateIn={'animate__fadeInUpBig'} animateOnce={true}
                                     duration={2} delay={500}/>
                </div>
                <div className={'rellax'} data-rellax-zindex="1" data-rellax-speed="2"
                     style={{gridRow: '6/10', gridColumn: '6/10'}}>
                    <ScrollAnimation className={'square'}
                                     animateIn={'animate__fadeInUpBig'} animateOnce={true}
                                     duration={2} delay={500}/>
                </div>
            </div>
        </div>
    );
}

export default HomeStart;