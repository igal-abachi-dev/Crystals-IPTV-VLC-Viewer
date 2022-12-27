import React, {useEffect, useState} from 'react';


import { row, textbox} from './ChannelData.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";


export function ChannelData() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiServer, setApiServer] = useState<string>('');

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

    return (
        <div >
            <div className={row }>

            </div>
        </div>
    );
}
