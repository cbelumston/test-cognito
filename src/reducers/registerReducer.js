import {types} from '../types/types';

const initialState = () => {
    return {
        init: false,
        error: false
    };
}

export const registerReducer = (state = initialState(), action) => {

    switch (action.type) {
        case types.authRegister:
            return {
                ...state,
                ...action.payload,
                init: false,
                error: false
            }
        case types.authRegisterSuccess:
            return {
                ...state,
                ...action.payload,
                init: true,
            }
        case types.authRegisterError:
            return {
                ...state,
                ...action.payload,
                init: true,
            }
        case types.authRegisterReset:
            return {
                ...state,
                ...action.payload,
                init: false,
                error: false
            }
        default:
            return state;
    }
}
