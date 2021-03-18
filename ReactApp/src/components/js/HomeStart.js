import React from "react";
import '../css/HomeStart.css';
import {Link} from "react-router-dom";


function HomeStart() {
    return (
        <div className={'homeStartContainer'}>
            <div className={'homeStart'}>
                <article className={'rellax'} data-rellax-zindex="3"
                         style={{position: 'absolute', left: 0, right: 0, top: 0}}>
                    <div className={'homeStartCenter animate__animated animate__fadeIn'}>
                        <h1 className={'title'}>Brainer</h1>
                        <h2 className={'startText'}>I'm something new entirely. With my own set of rules. I'm Dexter.
                            Boo.</h2>
                        <Link className={'btn startButton animate__animated animate__rubberBand'} to={'/signUp'}>Sign
                            Up</Link>
                    </div>
                </article>
                <div className={'rellax'} data-rellax-zindex="1" data-rellax-speed="-6" style={{
                    position: 'absolute',
                    right: 'calc(min(80vw, 80vh) * (-0.2))',
                    bottom: 'calc(min(80vw, 80vh) * (-0.5))'
                }}>
                    <div className={'circle animate__animated animate__fadeInRightBig'}/>
                </div>
                <div className={'rellax'} data-rellax-zindex="2" data-rellax-speed="-4" style={{
                    position: 'absolute',
                    right: 'calc(min(25vw, 25vh) * 0.15)',
                    bottom: 'calc(min(25vw, 25vh) * 0.8)'
                }}>
                    <div className={'square animate__animated animate__fadeInUpBig'}/>
                </div>
                <div className={'rellax'} data-rellax-zindex="2" data-rellax-speed="-4" style={{
                    position: 'absolute',
                    right: 'calc(min(25vw, 25vh) * 1.3)',
                    bottom: 'calc(min(25vw, 25vh) * 0.4)'
                }}>
                    <div className={'square animate__animated animate__fadeInUpBig'}/>
                </div>
            </div>
        </div>
    );
}

export default HomeStart;