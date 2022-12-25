import React, {useState} from 'react';

import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from '../../state/slices/counterSlice';

import {button, asyncButton, row, value, textbox, counterTheme} from './Counter.css';
import {vcn} from 'vanilla-classnames'

import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";

export type nullable<T> = (T | null | undefined);

export function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

//if component internally does dispatch , pass and propogate dispatch to component ,dispatch:any

    return (
        <div className={counterTheme}>
            <BtnActionRow dispatch={dispatch} count={count}/>
            <div className={row }>
                <input
                    className={textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={button}
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className={asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </button>
                <button
                    className={button}
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    );
}


export function BtnActionRow(props: any) {

    return (
        <div className={row }>
            <button
                className={button}
                aria-label="Decrement value"
                onClick={() => props.dispatch(decrement())}
            >
                -
            </button>
            <span className={value}>{props.count}</span>
            <button
                className={button}
                aria-label="Increment value"
                onClick={() => props.dispatch(increment())}
            >
                +
            </button>
        </div>
    );
}
