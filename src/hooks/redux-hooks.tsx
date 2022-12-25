import type {ChangeEvent} from 'react';
import {useEffect, useRef} from 'react';
import {
    createDispatchHook,
    createSelectorHook,
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from 'react-redux';
import type {RootState, AppDispatch} from '../state/store';
import {AppContext} from "../state/AppContextProvider";

export const useAppDispatch: () => AppDispatch = createDispatchHook(AppContext);
export const useAppSelector: TypedUseSelectorHook<RootState> = createSelectorHook(AppContext);
