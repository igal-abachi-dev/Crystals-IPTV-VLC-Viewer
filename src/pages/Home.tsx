import React,{ useEffect } from 'react';
import styles from "@/App.module.scss";

import {Chip, Divider} from '@mui/material';
import logo from "@/logo.svg";
import {Counter} from "@/components/counter/Counter";
import {Helmet} from 'react-helmet-async';
import {ChessGraph} from "@/components/ChessGraph/ChessGraph";


export function HomePage() {
const nodes =[
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];

const edges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
];

  return (
      <header className={styles.App_header}>
            <Helmet>
                <title>home</title>
            </Helmet>
        <img src={logo} className={styles.App_logo} alt="logo"/>
        <p>Hello Vite + React!</p>

        <Counter/>
 <div>
            <Divider variant='middle'>
                <Chip label="Queens Gambit Declined - Modern Tartakower" color="primary"/>
            </Divider>
            <div>
	    <ChessGraph nodes={nodes} edges={edges}/>
	    </div>
        </div>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
              className={styles.App_link}
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
              className={styles.App_link}
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
