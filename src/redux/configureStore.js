import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {cart} from './reducers/cart.js'
import { login } from './reducers/login.js';

export const configureStore = ()=>{
    const store = createStore(
        combineReducers(
            {
                cart: cart,
                login: login
            }
        ),
        applyMiddleware(thunk,logger)
    );
    return store;
}
