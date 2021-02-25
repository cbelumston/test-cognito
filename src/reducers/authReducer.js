import {types} from '../types/types';

const initialState = () => {
    return JSON.parse(localStorage.getItem('lasestrellas_auth')) || {
        error: false
    };
}

export const authReducer = (state = initialState(), action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                error: false
            }
        case types.authLoginSuccess:
            return {
                ...state,
                ...action.payload,
                error: false
            }
        case types.authLoginError:
            return {
                ...state,
                ...action.payload,
                error: true
            }
        case types.authLogout:
            return {
                error: false
            }
        default:
            return state;
    }
}
