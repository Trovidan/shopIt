import * as ActionTypes from './actionTypes.js'

export const addToCart = (amount, productID)=>({
    type: ActionTypes.CART_ADD,
    payload:{
        amount: amount,
        productID: productID
    }
});

export const removeFromCart = (amount, productIndex) => ({
    type: ActionTypes.CART_REMOVE,
    payload: {
        amount: amount,
        productIndex: productIndex
    }
});

export const verifyLogin = (user_details)=> (dispatch)=>{
        dispatch(loading_true());
        dispatch(login_user(user_details));
    }

export const logout = ()=>({
    type: ActionTypes.LOGIN_TERMINATE
});

export const tryLogin = ()=>({
    type: ActionTypes.LOGIN_TRY
});

const loading_true = ()=>({
    type: ActionTypes.LOGIN_VERIFY
});

const login_user = (user_details)=>({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user_details
})
