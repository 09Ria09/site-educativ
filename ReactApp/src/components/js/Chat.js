import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import '../css/Chat.css';
import axios from 'axios'
import TextEdit from './Profile/TextEdit'
import Loading from './Loading'

function Chat(props) {
    const [data, setData] = useState();
    const [value, setValue] = useState({});
    const [waitingResponse, setResponse] = useState(true);
    let history = useHistory();


    function valueHandler(t, v) {
        setValue(s => {
            let tmp = s;
            tmp[t] = v;
            return tmp
        })
    }

    useEffect(() => update({}), []);

    function update() {
        axios({
            method: 'post',
            url: history.location.pathname
        }).then(res => {
            setData(JSON.parse(res.request.response));
            console.log(data);
            setResponse(false);
        })
    }

    if (props.signedIn === false)
        return (<Redirect to='/'/>);

    function sendMessage() {
        let tmp = {};
        tmp['text'] = JSON.stringify(value['text'])
        tmp['id'] = data['id']
        axios({
            method: 'post',
            url: '/SendMessage',
            data: tmp
        })
    }
    if(!waitingResponse)
        return (
            <div className={'chatBox'}>
                <div className={'messageBox'}>
                    <h1 className={'name'}> 
                        {data['username']} 
                    </h1>
                    <TextEdit type={'textarea'}
                              name={'text'}
                              setValue={valueHandler}
                              editing={true}/>
                    <button className={'send'} onClick={sendMessage}>
                        Trimite
                    </button>
                </div>
            </div>
        )
    else
        return (
            <div className={'chatBox'}>
                <Loading />
            </div>
        )
}

export default Chat;