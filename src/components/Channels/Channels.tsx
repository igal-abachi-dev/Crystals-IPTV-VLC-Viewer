import React, {useState} from 'react';


import { row, textbox} from './Channels.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";


export function Channels() {

    const [incrementAmount, setIncrementAmount] = useState('2');


    return (
        <div >
            <div className={row }>
            {/*fetch channels only if 1 day past , cache the result*/}
            </div>
        </div>
    );
}

