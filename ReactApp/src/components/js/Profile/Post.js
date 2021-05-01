import React from "react";
import '../../css/Profile/Post.css';
import TextEdit from "./TextEdit";

function Post(props) {
    return (
        <div className={'post'}>
            {props.title !== 'undefined' ? (<h1>{props.title}</h1>) : ''}
            {props.video !== null && props.video !== '' ? (
                <div className={'newPostAdd'}>
                    <video className={'videoSelected'} src={props.video} controls/>
                </div>) : ''}
            {props.images !== null && props.images !== '' && props.images.length !== 0 ? (
                <div className={'newPostAdd imagesNewPostAdd' + (props.images.length === 1 ? ' onlyOneImage' : '')}>
                    {props.images.map((x, y) => {
                        return (
                            <img className={'imagesSelected'} key={y} src={x} alt={'image'}/>
                        )
                    })}
                </div>
            ) : ''}
            {props.text !== null && props.text !== 'undefined' && props.text !== '' && props.text !== "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]" ? (
                <div className={'newPostText'}>
                    <TextEdit type={'textarea'} editing={false} initialValue={props.text}/>
                </div>
            ) : ''}
            {props.docs.length !== 0 && props.docs !== '' ? (
                    <div className={'postDocsContainer'}>
                        <span className={'newPostAddDocsHeader'}>Documente:</span>
                        <div className={'newPostAdd newPostAddDocs'}>
                            {props.docs.map((x, y) => {
                                return (
                                    <a className={'docsSelected'} key={y} href={x.url}
                                       target={"_blank"}>{x.nume}</a>
                                );
                            })}
                        </div>
                    </div>
                )
                : ''}
        </div>
    );
}

export default Post;