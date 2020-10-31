import * as ActionTypes from '../actionTypes.js'

const initialLogin={
    try:false,
    loading: false,
    err: null,
    user_details: null
}

export const login =  (state=initialLogin, action)=>{
    switch(action.type){
        case ActionTypes.LOGIN_TRY:
            return {...initialLogin, try: true}

        case ActionTypes.LOGIN_VERIFY:
            return {...initialLogin,loading:true};
        
        case ActionTypes.LOGIN_TERMINATE:
            return initialLogin;

        case ActionTypes.LOGIN_FAILED:
            return {...initialLogin,err: action.payload};

        case ActionTypes.LOGIN_SUCCESS:
            return {...initialLogin, user_details: action.payload};
        
            default:
            return state;
    }
}