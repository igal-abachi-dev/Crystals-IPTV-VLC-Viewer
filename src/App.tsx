import React, {useState} from 'react';
import logo from './logo.svg'
import styles from './App.module.scss'
import {Counter} from "@/components/counter/Counter";
import Layout from "@/Layout";


import {pink} from "@mui/material/colors";

import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline, AppBar, Toolbar, Typography, Box, Button,Link } from "@mui/material";
import {Apps, ForkRight} from "@mui/icons-material";


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

    return (<ThemeProvider theme={theme}>
            <CssBaseline/>

            <AppBar position="relative">
                <Toolbar>
                    <Apps/>
                    <Typography variant="h6" color="inherit" sx={{flexGrow: 1}}
                                component={Link} href="/"
                                underline="none" noWrap>
                        Queen's Gambit / d4 Openings
                    </Typography>

                    <Button
                        component={Link} href="/About"
                        variant="contained"
                        color="secondary"
                        //         onClick={e => {
                        //     e.preventDefault()
                        //     navigate('/about');
                        // }}
                    >אודות</Button>


                    {/*<Button color="inherit" onClick={e => {*/}
                    {/*    e.preventDefault()*/}
                    {/*    navigate('/');*/}
                    {/*}}>אודות</Button>*/}
                </Toolbar>
            </AppBar>
            <main>
                <Layout/>
            </main>
            <Box sx={{bgcolor: '#282c34', p: 3}} component="footer">
                {/*<Copyright/>*/}
                {/*{new Date().getFullYear()}*/}
            </Box>
        </ThemeProvider>

    )
}

export default App
