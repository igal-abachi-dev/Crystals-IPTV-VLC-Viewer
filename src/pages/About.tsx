import React, {useEffect} from 'react';
import styles from "@/App.module.scss";


import { Helmet } from 'react-helmet-async';
export function AboutPage() {
    return (
        <header className={styles.App_header}>
            <Helmet>
                <title>about</title>
            </Helmet>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
        </header>
    );
}

export default AboutPage;
