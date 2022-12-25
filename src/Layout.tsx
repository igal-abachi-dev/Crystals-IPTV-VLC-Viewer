import React, {useEffect} from 'react';
import {Chip, Divider, ScopedCssBaseline} from '@mui/material';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import {app} from './Layout.css';

import HomePage from './pages/Home';
import AboutPage from './pages/About';





export function Layout() {
    return (
        <Router>
            <div className={app}>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to='/'>Home</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to='/About'>About</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                <ScopedCssBaseline>
                    <Routes>
                        {/*<Route path='/About' element={<AboutPage/>}/>*/}
                        <Route path='/' element={<HomePage/>}/>
                    </Routes>

                </ScopedCssBaseline>
            </div>
            </Router>);
}
/*


.App_header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;


  button {
    font-size: calc(10px + 2vmin);
  }
}

.App_link {
  color: #61dafb;
}
*/
export default Layout;
