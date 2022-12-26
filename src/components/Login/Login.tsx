import React, {useState} from 'react';


import { row, textbox} from './Login.css';

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {CrystalApi} from "../../api/Crystal-Api";


export function Login() {

    const [incrementAmount, setIncrementAmount] = useState<string>('2');


    //on login click -> check is valid , and auth =1
    //then set to localStorage
    //and refresh


    return (
        <div >
            <div className={row }>
login
            </div>
        </div>
    );

}
