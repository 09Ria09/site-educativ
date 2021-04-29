import React from "react";
import '../../css/Profile/Post.css';
import TextEdit from "./TextEdit";

function Post(props) {
    console.log(props.title, 'this is props');
    return (
        <div className={'post'}>
            <h1>{props.title}</h1>
            <div className={'newPostAdd'}>
                {props.video !== null && props.video !== '' ? (<video className={'videoSelected'} src={props.video} controls/>) : ''}
            </div>
            <div className={'newPostAdd imagesNewPostAdd'}>
                {props.images !== null && props.images !== '' ? props.images.map((x, y) => {
                    return (
                        <img className={'imagesSelected'} key={y} src={x} alt={'image'}/>
                    );
                }) : ''}
            </div>
            {props.text !== null && props.text !== '' ? (
                <div className={'newPostText'}>
                    <TextEdit type={'textarea'} editing={false} initialValue={props.text}/>
                </div>
            ) : ''}
            {props.docs.length != 0 && props.docs !== '' ? (
                    <div>
                        <span className={'newPostAddDocsHeader'}>Documente:</span>
                        <div className={'newPostAdd newPostAddDocs'}>
                            {props.docs.map((x, y) => {
                                return (
                                    <a className={'docsSelected'} key={y} href={x.link}
                                       target={"_blank"}>{x.name}</a>
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