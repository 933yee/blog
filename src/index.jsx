import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import Main from 'components/Main.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const loggerMiddleware = createLogger();



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
// combineReducers({
// }),
// for debugging
// composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
// );

ReactDOM.render(
    // <Provider store={store}>
    <Main />,
    // </Provider>,
    document.getElementById('root')
);