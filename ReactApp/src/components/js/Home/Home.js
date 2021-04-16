import React, {useEffect} from "react";
import Rellax from "rellax";
import HomeStart from "./HomeStart";
import Content from "./Content";
import Features from "./Features";

function Home(props) {
    useEffect(() => {
        new Rellax('.rellax');
    });
    return (
        <React.Fragment>
            <HomeStart signedIn={props.signedIn}/>
            <Content type={'A'} style={{marginBottom: '20vh'}}>
                <h3>Cops, another community I'm not part of.</h3>
                <p>Tell him time is of the essence. Pretend. You pretend the feelings are there, for the world, for the
                    people around you. Who knows? Maybe one day they will be. I'm going to tell you something that I've
                    never told anyone before.</p>
                <ul>
                    <li>I'm real proud of you for coming, bro. I know you hate funerals.</li>
                    <li>I'm Dexter, and I'm not sure what I am.</li>
                    <li>I'm thinking two circus clowns dancing. You?</li>
                </ul>
            </Content>
            <Content type={'E'} style={{marginBottom: '20vh'}}>
                <p>God created pudding, and then he rested. Keep your mind limber. Makes me a … scientist. God created
                    pudding, and then he rested. I'm doing mental jumping jacks.</p>
                <p>Watching ice melt. This is fun. Oh I beg to differ, I think we have a lot to discuss. After all, you
                    are a client. Pretend. You pretend the feelings are there, for the world, for the people around you.
                    Who knows? Maybe one day they will be.</p>
                <p>Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows?
                    Maybe one day they will be. Under normal circumstances, I'd take that as a compliment. You all
                    right, Dexter?</p>
                <p>I'm not the monster he wants me to be. So I'm neither man nor beast. I'm something new entirely. With
                    my own set of rules. I'm Dexter. Boo. Somehow, I doubt that. You have a good heart, Dexter. You're a
                    killer. I catch killers.</p>
            </Content>
            <Features/>
        </React.Fragment>
    );
}

export default Home;