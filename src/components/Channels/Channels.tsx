import React, {useEffect, useState} from 'react';


import {row, textbox} from './Channels.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {LiveStream} from "../../api/api.types";
import {CrystalApi} from "../../api/Crystal-Api";


export function Channels(props:{stream_id_changed:(id:number)=>void}) {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiServer, setApiServer] = useState<string>('');


    const [channels, setChannels] = useState<LiveStream[]>([]);

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


    useEffect(() => {
        if ((username != null && username.length > 0)
            && (password != null && password.length > 0)
            && (apiServer != null && apiServer.length > 0)
            && (channels == null || channels.length == 0)) {

            const api = new CrystalApi(apiServer, username, password);
            if (api.valid) {
                api.GetLiveStreamsByCategoryId().then(res => {//39 hebrew/israel
                    console.log(res);
                    if (res != null)
                        setChannels(res);
                });
            }
        }
    }, [username, password, apiServer]);


    return (
        <div>
            <div className={row}>
                <ul>
                {channels.map((c) => (
                    <li>{JSON.stringify(c)}</li>
                ))}
                </ul>
            </div>
        </div>
    );
}

