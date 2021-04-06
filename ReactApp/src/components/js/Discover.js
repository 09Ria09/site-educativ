import React, {useEffect, useState} from "react";
import '../css/Discover.css';
import PersonSummary from "./PersonSummary";
import Filter from "./Filter";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, EditorState} from "draft-js";

function Discover(props) {
    const [summaries, setSummaries] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(true);

    useEffect(() => {
        console.log(summaries)
    }, [summaries])

    function update(filter) {
        setWaitingResponse(true);
        console.log(filter)
        axios({
            method: 'post',
            url: '/GetSummaries',
            data: filter
        }).then(res => {
            console.log(JSON.parse(res.request.response))
            setSummaries(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }

    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    return (
        <div className={'discoverContainer'}>
            <div className={'discover'}>
                <Filter filterHandler={update}/>
                <div className={'people'}>
                    {summaries.map((x, y) => {
                        return (
                            <PersonSummary name={(x['prenume'] + ' ' + x['nume'])}>
                                <Editor wrapperClassName="textareaWrapper"
                                        editorClassName={"textareaEditor textareaEditorReadOnly"}
                                        toolbarClassName={"textareaToolbar"}
                                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(x['descriere'])))}
                                        editorStyle={{textAlign: 'justify'}}
                                        readOnly={true}
                                />
                            </PersonSummary>
                        );
                    })
                    }
                    <PersonSummary name={'Dexter Morgan'} image={'placeholder.jpg'}>This man is a knight in shining
                        armor.
                        I'm real proud of you for coming, bro. I know you hate funerals. This man is a knight in shining
                        armor. God created pudding, and then he rested. Pretend. You pretend the feelings are there, for
                        the
                        world, for the people around you. Who knows? Maybe one day they will be.</PersonSummary>
                    <PersonSummary name={'Vince Masuka'} image={'placeholder1.jpg'}>Like a sloth. I can do that. I have
                        a
                        dark side, too. I will not kill my sister. I will not kill my sister. I will not kill my sister.
                        I'm
                        really more an apartment person. I have a dark side, too. I will not kill my sister. I will not
                        kill
                        my sister. I will not kill my sister.</PersonSummary>
                    <PersonSummary name={'Debra Morgan'} image={'placeholder2.jpg'}>I'm real proud of you for coming,
                        bro. I
                        know you hate funerals. I'm going to tell you something that I've never told anyone before. I'm
                        doing mental jumping jacks. I've lived in darkness a long time. Over the years my eyes adjusted
                        until the dark became my world and I could see.</PersonSummary>
                </div>
            </div>
        </div>
    );
}

export default Discover;