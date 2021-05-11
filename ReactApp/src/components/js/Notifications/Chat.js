import React, {useEffect, useState} from 'react'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import '../../css/Chat.css';
import axios from 'axios'
import TextEdit from '../Profile/TextEdit'
import Loading from '../Loading'

function Chat(props) {
    const [data, setData] = useState();
    const [value, setValue] = useState({});
    const [sent, setSent] = useState(false);
    const [waitingResponse, setResponse] = useState(true);
    let history = useHistory();


    function valueHandler(t, v) {
        setValue(s => {
            let tmp = s;
            tmp[t] = v;
            return tmp
        })
    }

    useEffect(() => {if(history.location.pathname.substring(0,5)==='/chat') update({})}, [useParams()]);

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
    if (props.completedProfile === 0)
        return (<Redirect to='/Profile'/>);

    function sendMessage() {
        let tmp = {};
        tmp['text'] = JSON.stringify(value['text'])
        tmp['id'] = data['id']
        axios({
            method: 'post',
            url: '/SendMessage',
            data: tmp
        }).then(res => {
            setSent(true);
        })
    }

    if (sent === true)
        return (<div className='bg' style={{
            display: 'flex',
            color: 'rgb(var(--columbiablue))',
            fontSize: '1.5em',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Mesajul a fost trimis.</h1>
        </div>);
    else if (!waitingResponse)
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
                </div>
                <button className={'btn personButton newPostBtn send'} onClick={sendMessage}>
                    Trimite
                </button>
            </div>
        )
    else
        return (
            <div className={'chatBox noBG'}>
                <Loading/>
            </div>
        )
}

export default Chat;