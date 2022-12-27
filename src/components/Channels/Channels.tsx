import React, {useEffect, useState} from 'react';


import { row, textbox} from './Channels.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";


export function Channels() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiServer, setApiServer] = useState<string>('');



    //const [username, setUsername] = useState<string>('');//channels1

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user != null) {
            setUsername(user);
        }
        const pass = localStorage.getItem('password');
        if (pass != null) {
            setPassword(pass);
        }
        const srv = localStorage.getItem('apiServer');
        if (srv != null) {
            setApiServer(srv);
        }
    }, []);

    //
    // useEffect(() => {
    //     //when all ! null , and channel[] is empty/null
    //     //call api
    // }, [username,password,apiServer]);



    return (
        <div >
            <div className={row }>
            {/*fetch channels only if 1 day past , cache the result*/}
            </div>
        </div>
    );
}

