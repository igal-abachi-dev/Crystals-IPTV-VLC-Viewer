import React, {useEffect} from 'react';

import {Chip, Divider} from '@mui/material';
import {Helmet} from 'react-helmet-async';

import {Login} from "../components/Login/Login";
import {Channels} from "../components/Channels/Channels";
import {ChannelData} from "../components/ChannelData/ChannelData";


export function HomePage() {

    return (
        <header>
            <Helmet>
                <title>Crystals IPTV decoder</title>
            </Helmet>
            <p>Hello Vite + React!</p>

            <div>
                <Divider variant='middle'>
                    <Chip label="Login" color="primary"/>
                </Divider>
                <div>
                {/*    hide when logged in , if not logged in , hide others*/}
                <Login/>
                </div>
            </div>

            <div>
                <Divider variant='middle'>
                    <Chip label="Channels" color="primary"/>
                </Divider>
                <div>
                {/*    datagrid with logo*/}
                <Channels/>
                </div>
            </div>


            <div>
                <Divider variant='middle'>
                    <Chip label="Channel Info" color="primary"/>
                </Divider>
                <div>
                {/*    epg + ling to copy*/}
                </div>
                <ChannelData/>
            </div>
            <p>
                Edit <code>App.tsx</code> and save to test HMR updates.
            </p>
            <p>
                <a
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {' | '}
                <a
                    href="https://vitejs.dev/guide/features.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vite Docs
                </a>
            </p>
        </header>
    );
}

export default HomePage;
