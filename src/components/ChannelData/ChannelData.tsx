import React, {useEffect, useState} from 'react';


import { textbox} from './ChannelData.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {CrystalApi} from "../../api/Crystal-Api";
import {LiveStream, ShortEpg} from "../../api/api.types";

import {DataGrid, GridRowsProp, GridColDef} from '@mui/x-data-grid';
import {Box, TextField} from "@mui/material";

import { format } from 'date-fns';


const b64DecodeUnicode =(str:string):string => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(window.atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));;
};


const getTitle = (params) => {
    return b64DecodeUnicode(params.row.title);
}
const getTimeRange = (params) => {
    return `${params.row.start.split(' ')[1] || ''} - ${params.row.end.split(' ')[1] || ''}`;
}
const getDesc = (params) => {
    return b64DecodeUnicode(params.row.description);
}

const columns: GridColDef[] = [
    //id , lang
    {field: 'title', headerName: 'title', width: 300, valueGetter: getTitle},
    {field: 'start_timestamp', headerName: 'time range', width: 150, valueGetter: getTimeRange},
    {field: 'description', headerName: 'description', width: 800, valueGetter: getDesc},
];


export function ChannelData(props: { stream_id: number | null | undefined }) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiServer, setApiServer] = useState<string>('');

    const [shortEpg, setShortEpg] = useState<ShortEpg>({epg_listings: []});
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
            && (apiServer != null && apiServer.length > 0)) {

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
            <div>
                <p>{"Channel: " + props.stream_id}</p>
                <TextField value={vlcStreamUrl}
                           type={'text'} className={textbox}
                           label="VLC Stream url:"
                           variant="filled"
                           margin='normal'
                />
                <br/>
                <div style={{height: 300, width: '100%'}}>
                    <DataGrid rows={shortEpg.epg_listings} columns={columns}  hideFooter />
                </div>
            </div>
        </div>
    );
}
