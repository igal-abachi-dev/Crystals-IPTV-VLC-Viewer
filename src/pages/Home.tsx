import React, {useEffect, useState} from 'react';

import {Chip, Divider} from '@mui/material';
import {Helmet} from 'react-helmet-async';

import {Login} from "../components/Login/Login";
import {Channels} from "../components/Channels/Channels";
import {ChannelData} from "../components/ChannelData/ChannelData";
import {LoginData} from "../api/api.types";


export function HomePage() {
    const [loginData, setLoginData] = useState<LoginData|null>(null);


    useEffect(() => {
        let item = localStorage.getItem('LoginData');
        console.log(item);
        if (item != null) {
            let data = JSON.parse(item) as LoginData;
            if (data.user_info.auth == 1) {
                setLoginData(data);
            }
        }
    }, []);

    return (
        <header>
            <Helmet>
                <title>Crystals IPTV decoder</title>
            </Helmet>

            <div>
                <Divider variant='middle'>
                    <Chip label="Login" color="primary"/>
                </Divider>
                <div>
                    {/*    hide when logged in , if not logged in , hide others*/}
                    <Login/>
                </div>
            </div>

            {(loginData == null) ?? (<div>
                <Divider variant='middle'>
                    <Chip label="Login" color="primary"/>
                </Divider>
                <div>
                    {/*    hide when logged in , if not logged in , hide others*/}
                    <Login/>
                </div>
            </div>)}

            {(loginData != null) ?? (<div>
                <Divider variant='middle'>
                    <Chip label="Channels" color="primary"/>
                </Divider>
                <div>
                    {/*    datagrid with logo*/}
                    <Channels/>
                </div>
            </div>)
            }
            {(loginData != null) && (<div>
                <Divider variant='middle'>
                    <Chip label="Channel Info" color="primary"/>
                </Divider>
                <div>
                    {/*    epg + ling to copy*/}
                </div>
                <ChannelData/>
            </div>)
            }
        </header>
    );
}

export default HomePage;
