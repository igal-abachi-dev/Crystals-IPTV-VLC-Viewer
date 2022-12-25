import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AppContextProvider} from "@/state/AppContextProvider";
import {HelmetProvider} from 'react-helmet-async';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </AppContextProvider>
    </React.StrictMode>
);
