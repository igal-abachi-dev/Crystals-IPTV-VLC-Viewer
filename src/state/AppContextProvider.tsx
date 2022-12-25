import {} from '@reduxjs/toolkit';
import { Provider, ReactReduxContextValue } from 'react-redux';
import store from './store';
import React from "react";

export const AppContext = React.createContext<ReactReduxContextValue>(null);

// @ts-ignore
export function AppContextProvider({ children }) {
  return (
    <Provider store={store} context={AppContext}>
      {children}
    </Provider>
  );
}


