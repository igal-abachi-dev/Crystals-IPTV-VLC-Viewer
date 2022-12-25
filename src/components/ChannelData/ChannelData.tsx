import React, {useState} from 'react';


import { row, textbox} from './ChannelData.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";


export function ChannelData() {

    const [incrementAmount, setIncrementAmount] = useState('2');


    return (
        <div >
            <div className={row }>

            </div>
        </div>
    );
}
