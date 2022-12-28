import React, {useEffect, useState} from 'react';


import {row, textbox} from './Channels.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {LiveStream} from "../../api/api.types";
import {CrystalApi} from "../../api/Crystal-Api";

import {DataGrid, GridRowsProp, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';


const columns: GridColDef[] = [
    {field: 'stream_id', headerName: 'stream_id', width: 100},
    {field: 'stream_icon', headerName: '', width: 100,renderCell: (params: GridRenderCellParams<string>) => (<img src={params.value} height={50}/>)},
    {field: 'name', headerName: 'name', width: 400},
];

/*
download all of them locally , serve http2:
http://logo.ottc.pro:8080/logos/ISRAEL/CHANNEL9.png
*/

export function Channels(props: { stream_id_changed: (id: number) => void }) {

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
                    if (res != null) {
                        res = res.filter((c) => {
                            //also block:
                            //|IL| FASHION HD
                            //|IL| HOT Ego Total
                            
                            return c.is_adult === "0";

                            //also block arab:
                            //|IL| HOT Makan
                            //|IL| MIKAN
                            //|IL| HALA TV
                            //|IL-4K| HALA TV HD
                        })
                        setChannels(res);
                    }
                });
            }
        }
    }, [username, password, apiServer]);


    return (
        <div>
            <div className={row}>
                <div style={{height: 600, width: '100%'}}>
                    <DataGrid rows={channels} columns={columns} getRowId={r => r.stream_id} onRowClick={r => {
                        props.stream_id_changed(r.row.stream_id)
                    }}
                              hideFooterSelectedRowCount/>
                </div>
            </div>
        </div>
    );
}

