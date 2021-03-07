import React, {useEffect} from "react";
import Rellax from "rellax";
import HomeStart from "./HomeStart";
import Content from "./Content";

function Home() {
    useEffect(() => {
        new Rellax('.rellax', {
            center: true
        });
    });
    return (
        <React.Fragment>
            <HomeStart/>
            <Content type={'A'}>
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
            <Content type={'B'}>
                <p>You all right, Dexter? Watching ice melt. This is fun. Tell him time is of the essence. Only you
                    could make those words cute. Keep your mind limber.</p>
                <p>Tonight's the night. And it's going to happen again and again. It has to happen. Keep your mind
                    limber. Finding a needle in a haystack isn't hard when every straw is computerized. I will not kill
                    my sister. I will not kill my sister. I will not kill my sister.</p>
                <p>I like seafood. Under normal circumstances, I'd take that as a compliment. I'm not the monster he
                    wants me to be. So I'm neither man nor beast. I'm something new entirely. With my own set of rules.
                    I'm Dexter. Boo.</p>
                <p>I'm really more an apartment person. I like seafood. Pretend. You pretend the feelings are there, for
                    the world, for the people around you. Who knows? Maybe one day they will be. I am not a killer.
                    Makes me a … scientist.</p>
            </Content>
            <Content type={'C'}>
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
            <Content type={'D'}>
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
            <Content type={'E'}>
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
        </React.Fragment>
    );
}

export default Home;