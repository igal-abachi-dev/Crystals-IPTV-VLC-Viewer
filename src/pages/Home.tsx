import React, {useEffect} from 'react';

import {Chip, Divider} from '@mui/material';
import {Helmet} from 'react-helmet-async';


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
                </div>
            </div>

            <div>
                <Divider variant='middle'>
                    <Chip label="Channels" color="primary"/>
                </Divider>
                <div>
                {/*    datagrid with logo*/}
                </div>
            </div>


            <div>
                <Divider variant='middle'>
                    <Chip label="Channel Info" color="primary"/>
                </Divider>
                <div>
                {/*    epg + ling to copy*/}
                </div>
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
