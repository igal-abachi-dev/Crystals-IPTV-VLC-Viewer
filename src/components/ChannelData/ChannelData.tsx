import React, {useEffect, useState} from 'react';


import {row, textbox} from './ChannelData.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {CrystalApi} from "../../api/Crystal-Api";
import {LiveStream, ShortEpg} from "../../api/api.types";


export function ChannelData(props: { stream_id: number | null | undefined }) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiServer, setApiServer] = useState<string>('');

    const [shortEpg, setShortEpg] = useState<ShortEpg | null>(null);
    const [vlcStreamUrl, setVlcStreamUrl] = useState<string>('');

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
            && (shortEpg == null)) {

            const api = new CrystalApi(apiServer, username, password);
            if (api.valid) {
                setVlcStreamUrl(api.GetVlcStreamUrlById(props.stream_id));

                api.GetShortEpgByStreamId(props.stream_id).then(res => {
                    console.log(res);
                    if (res != null)
                        setShortEpg(res);
                });
            }
        }
    }, [props.stream_id]);
    return (
        <div>
            <div className={row}>
                {props.stream_id}
                <br/>
                {vlcStreamUrl}
                <br/>

                <ul>
                    {shortEpg?.epg_listings.map((l) => (
                        <li>{JSON.stringify(l)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
