import React, {useState} from "react";
import '../../css/Profile/Post.css';
import TextEdit from "./TextEdit";
import AddFiles from "./AddFiles";
import axios from "axios";

function NewPost() {
    const [text, setText] = useState(null);
    const [value, setValue] = useState({});
    const [errors, setErrors] = useState({});

    function valueHandler(t, v) {
        setValue(s => {
            let tmp = s;
            tmp[t] = v;
            return tmp
        })
    }

    return (
        <div className={'newPost'}>
            <h1 className={'newPostHeader'}>Adaugă o postare nouă!</h1>
            <TextEdit type={'input'}
                      name={'title'}
                      setValue={valueHandler}
                      editing={true}
                      errors={errors['noTitle']}
                      placeholder={'Titlu'}
                      maxlength={128}/>
            <AddFiles preview={'video'} placeholder={'Video'} icon={'ri-video-add-line'}
                      accept={'video/mp4,video/ogg,video/webm'} setValue={valueHandler} name={'video'}/>
            <AddFiles preview={'img'} placeholder={'Imagini'} icon={'ri-image-add-line'}
                      accept={'image/x-png,image/gif,image/jpeg'} setValue={valueHandler} name={'images'} multiple/>

            {text === true ? (
                <div className={'newPostText'}>
                    <TextEdit type={'textarea'}
                              name={'text'}
                              setValue={valueHandler}
                              editing={true}
                              placeholder={'Adaugă Text'}
                              errors={errors}/>

                    <button onClick={() => setText(false)}>
                        <i style={{fontSize: '32px', color: "rgb(var(--columbiablue))"}}
                           className="ri-close-circle-line"/>
                    </button>
                </div>
            ) : (
                <button onClick={() => setText(true)} className={'newPostAdd'}>
                    <i className={'ri-text addIcon'}/>
                    Adaugă Text</button>)}

            <AddFiles preview={'a'} placeholder={'Documente'} icon={'ri-file-add-line'}
                      accept={'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf'}
                      setValue={valueHandler} name={'docs'} multiple/>
            <button className={'btn personButton newPostBtn'} onClick={() => {
                let tmp = new FormData();
                tmp.append('video', value['video'][0])
                value['images'].forEach((x, y) =>
                    tmp.append('images', x))
                tmp.append('text', JSON.stringify(value['text']))
                value['docs'].forEach((x, y) =>
                    tmp.append('docs', x))
                tmp.append('title', value['title'])
                axios({
                    method: 'post',
                    url: '/NewPost',
                    data: tmp

                }).then(res => {
                    let tmp = JSON.parse(res.request.response)
                    setErrors(tmp);
                    if (tmp['noTitle'] === undefined)
                        window.location.reload();
                });
            }}>
                Submit
            </button>
        </div>
    );
}

export default NewPost;