import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.sass';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/landing";
import Aux from "./Hoc/Aux/Aux";

const rootReducer = combineReducers({
    auth: authReducer
})

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching ', action);
            const result = next(action);
            console.log('[Middleware] next state: ', store.getState());
            return result;
        }
    }


}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const comp = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(comp, document.getElementById('root'));