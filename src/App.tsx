import React, {useState} from 'react';
import logo from './logo.svg'
import styles from './App.module.scss'
import {Counter} from "./components/counter/Counter";
import Layout from "./Layout";


import {pink} from "@mui/material/colors";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline, AppBar, Toolbar, Typography, Box, Button,Link } from "@mui/material";
import {Apps, ForkRight, PlayCircleOutline} from "@mui/icons-material";
import {CrystalApi} from "./api/Crystal-Api";


function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0d1460',
                contrastText: '#ffffff',
            },

            secondary: {
                main: '#000000',
                contrastText: '#ffffff',
            }
        },
    });


    const api = new CrystalApi(null,null,null);

    return (<ThemeProvider theme={theme}>
            <CssBaseline/>

            <AppBar position="relative">
                <Toolbar>
                    <PlayCircleOutline/>
                    <Typography variant="h6" color="inherit" sx={{flexGrow: 1}}
                                component={Link} href="/"
                                underline="none" noWrap>
                        Crystal IPTV to VLC streams
                    </Typography>


                    <Button color="inherit" onClick={e => {
                        e.preventDefault()
                        api?.Logout();
                    }}>התנתק</Button>
                </Toolbar>
            </AppBar>
            <main>
                <Layout/>
            </main>
            <Box sx={{bgcolor: '#0d1460', p: 3}} component="footer">
                {/*<p>*/}
                {/*    {"run web site in no-CORS mode:"}*/}
                {/*    <code>"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=c:\temp</code>*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    {"or in firefox with: "}*/}
                {/*    <a href={'https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/'}>CORS Everywhere</a>*/}
                {/*    {" addon"}*/}
                {/*</p>*/}
                {/*<Copyright/>*/}
                {/*{new Date().getFullYear()}*/}
            </Box>
        </ThemeProvider>

    )
}

export default App
