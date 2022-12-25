import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,

        // one: oneSlice.reducer,
        // two: twoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType,
        RootState,
        unknown,
        Action<string>>;

export default store;


//https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
//
//https://redux-toolkit.js.org/api/serializabilityMiddleware
//
//https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
//
//https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
//


//https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions
//Promises, Symbols, Maps/Sets, functions, or class instances

//Reducers Must Not Have Side Effects: (AJAX calls, timeouts, promises)

