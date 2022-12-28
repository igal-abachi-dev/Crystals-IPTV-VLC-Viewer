import React, {useEffect, useState} from 'react';

import {Chip, Divider} from '@mui/material';
import {Helmet} from 'react-helmet-async';

import {Login} from "../components/Login/Login";
import {Channels} from "../components/Channels/Channels";
import {ChannelData} from "../components/ChannelData/ChannelData";
import {LoginData} from "../api/api.types";


export function HomePage() {
    const [loginData, setLoginData] = useState<LoginData | null>(null);
    const [stream_id, setStream_id] = useState<number|null>(null);


    useEffect(() => {
        let item = localStorage.getItem('LoginData');
        console.log(item);
        if (item != null) {
            let data = JSON.parse(item) as LoginData;
            if (data.user_info.auth == 1) {
                setLoginData(data);
                //don't check for week expiration to logout , for now...
            }
        }
    }, []);

    const content = (loginData == null)
        ? (<div>
            <Divider variant='middle'>
                <Chip label="Login" color="primary"/>
            </Divider>
            <div>
                {/*    hide when logged in , if not logged in , hide others*/}
                <Login/>
            </div>
        </div>)
        : (<div>
            <div>
                <Divider variant='middle'>
                    <Chip label="Channels" color="primary"/>
                </Divider>
                <div>
                    {/*    datagrid with logo*/}
                    <Channels stream_id_changed={(id)=>{
                        setStream_id(id);
                    }}/>
                </div>
            </div>

            <div>
                <Divider variant='middle'>
                    <Chip label="Channel Info" color="primary"/>
                </Divider>
                <div>
                    {/*    epg + ling to copy*/}
                </div>
                <ChannelData stream_id={stream_id}/>
            </div>
        </div>);

    return (
        <header>
            <Helmet>
                <title>Crystals IPTV decoder</title>
            </Helmet>

            {
                content
            }
        </header>
    );
}

export default HomePage;
