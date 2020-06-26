import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import allReducers from './reducers';
import { Provider } from 'react-redux';
import { clearTasks } from './actions/taskActions';
import setMidnightClear from './functions/setMidnightClear';

setMidnightClear();
const middleware = [thunk];

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e) {
        console.log(e);
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

export const myStore = createStore(allReducers,
    persistedState,
    compose(applyMiddleware(...middleware)
    // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

myStore.subscribe(() => saveToLocalStorage(myStore.getState()))



ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

