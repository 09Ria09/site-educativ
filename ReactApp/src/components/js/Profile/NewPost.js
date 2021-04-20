import React, {useState} from "react";
import '../../css/Profile/NewPost.css';
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
                      errors={errors['invalidTitle']}
                      placeholder={'Titlu'}
                      maxlength={128}/>
            <AddFiles preview={'video'} placeholder={'Video'} icon={'video-add-line.png'}
                      accept={'video/mp4,video/ogg,video/webm'} setValue={valueHandler} name={'video'}/>
            <AddFiles preview={'img'} placeholder={'Imagini'} icon={'image-add-line.png'}
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
                        <img src={'close-circle-line.png'} alt={'reset images'}/>
                    </button>
                </div>
            ) : (
                <button onClick={() => setText(true)} className={'newPostAdd'}>
                    <img className={'addIcon'} src={'text.png'} alt={'add text'}/>Adaugă Text</button>)}

            <AddFiles preview={'a'} placeholder={'Documente'} icon={'file-add-line.png'}
                      accept={'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf'}
                      setValue={valueHandler} name={'docs'} multiple/>
            <button className={'btn personButton newPostBtn'} onClick={() => {
                let tmp = new FormData();
                tmp.append('video', value['video'])
                tmp.append('images', value['images'])
                tmp.append('text', value['text'])
                tmp.append('docs', value['docs'])
                tmp.append('title', value['title'])
                axios({
                    method: 'post',
                    url: '/NewPost',
                    data: tmp

                }).then(res => {
                    console.log(res)
                });
            }}>
                Submit
            </button>
        </div>
    );
}

export default NewPost;