import React, {useEffect, useState} from "react";
import '../../css/Discover/Discover.css';
import {Redirect} from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import Post from "./Post";

function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [waitingResponse, setWaitingResponse] = useState(true);

    useEffect(() => update(), []);

    function update() {
        setWaitingResponse(true);
        setWaitingResponse(false)
        return;
        axios({
            method: 'post',
            url: '/GetPosts',
            data: props.id
        }).then(res => {
            setPosts(JSON.parse(res.request.response))
            setWaitingResponse(false)
        });
    }

    if (props.signedIn === false)
        return (<Redirect to='/'/>);
    if (props.completedProfile === 0)
        return (<Redirect to='/Profile'/>);
    if (waitingResponse === true)
        return (
            <div className={'discoverContainer'}>
                <div className={'discover'}>
                    <div className={'people'}>
                        <Loading/>
                    </div>
                </div>
            </div>
        );
    return (
        <div className={'postsContainer'}>
            <div className={'posts'}>
                {posts === null ? ('') :
                    posts.map((x, y) => {
                        return (
                            <Post video={x.video} images={x.images} text={x.text} docs={x.docs}/>
                        );
                    })
                }
                {
                    /*
                <Post title={'Postare'} video={'placeholder.mp4'} images={['placeholder.jpg', 'placeholder2.jpg']}
                      text={'[{"type": "paragraph", "children": [{"text": "fdsafdasfd"}]}]'}
                      docs={[{name: 'roboti', link: 'robots.txt'}]}/>
                <Post title={'Postare'} video={'placeholder.mp4'}
                      images={['placeholder.jpg', 'placeholder1.jpg', 'placeholder2.jpg']}
                      text={'[{"type": "paragraph", "children": [{"text": "fdsafdasfd"}]}]'}
                      docs={[{name: 'roboti', link: 'robots.txt'}, {
                          name: 'roboti',
                          link: 'robots.txt'
                      }, {name: 'roboti', link: 'robots.txt'}]}/>
                <Post title={'Postare'} video={'placeholder.mp4'}
                      images={['placeholder.jpg', 'placeholder1.jpg', 'placeholder2.jpg']}
                      text={'[{"type": "paragraph", "children": [{"text": "fdsafdasfd"}]}]'}
                      docs={[{name: 'roboti', link: 'robots.txt'}]}/>
                      */
                }
            </div>
        </div>
    );
}

export default Posts;