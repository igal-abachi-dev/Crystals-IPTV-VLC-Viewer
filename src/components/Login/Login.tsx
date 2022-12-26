import React, {MouseEventHandler, useEffect, useState} from 'react';


import {row, textbox, button} from './Login.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {CrystalApi} from "../../api/Crystal-Api";

import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@mui/material";


export function Login() {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [server, setServer] = useState<string>('');
    const [port, setPort] = useState<string>('80');


    //on login click -> check is valid , and auth =1
    //then set to localStorage
    //and refresh

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user != null) {
            setUsername(user);
        }
        const pass = localStorage.getItem('password');
        if (pass != null) {
            setPassword(pass);
        }
        const srv = localStorage.getItem('server');
        if (srv != null) {
            setServer(srv);
        }
        const p = localStorage.getItem('port');
        if (p != null) {
            setPort(p);
        }
    }, []);

    const onLoginClick = async () => {
        localStorage.removeItem('LoginData');
        localStorage.removeItem('LoginTime');
        console.log("onLoginClick()");

        const apiServer = port != '80' ? (server + ':' + port) : server;
        const api = new CrystalApi(apiServer, username, password);
        if (api.valid) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('apiServer', apiServer);
            localStorage.setItem('server', server);
            localStorage.setItem('port', port);


            const loginData = await api.Login();
            console.log(loginData);

            if (loginData?.user_info?.auth == 1) {
                localStorage.setItem('LoginData', JSON.stringify(loginData));
                localStorage.setItem('LoginTime', Date.now().toString());
                document.location.reload();
            }
        }
        else{
            console.log("invalid details")
        }
    };

    /*
    localStorage:{
        LoginData, //as login token
        LoginTime// if week past , loginData is expired

            username, //to use crystal api
            password,//website is for functional comfort , not for prod security
            server,
            port,

            LiveStreams //in case connection/server/data is down
    }*/

    return (
        <div>
            <div className={row}>
                <Box sx={{mt: 1}}>
                    <TextField value={username} placeholder={'username'}
                               type={'text'} className={textbox}
                               onChange={(e) => {
                                   setUsername(e.target.value);
                               }}
                               label="username"
                               variant="filled"
                               margin='normal'
                               autoFocus
                    />
                    <br/>

                    <TextField value={password} placeholder={'password'}
                               onChange={(e) => {
                                   setPassword(e.target.value);
                               }}
                               type={'password'} className={textbox}
                               label="password"
                               variant="filled"
                               margin='normal'
                    />
                    <br/>
                    <TextField value={server} placeholder={'server'}
                               onChange={(e) => {
                                   setServer(e.target.value);
                               }}
                               type={'text'} className={textbox}
                               label="server"
                               variant="filled"
                               margin='normal'
                    />
                    <br/>

                    <TextField value={port} placeholder={'port'}
                               onChange={(e) => {
                                   setPort(e.target.value);
                               }}
                               type={'text'} className={textbox}
                               label="port"
                               variant="filled"
                               margin='normal'
                    />
                    <br/>

                    <Button
                        type='button'
                        variant='contained'
                        className={button}
                        onClick={onLoginClick}
                        sx={{mt: 3, mb: 2}}
                    >
                        {'Login'}
                    </Button>
                </Box>
            </div>
        </div>
    );


}
