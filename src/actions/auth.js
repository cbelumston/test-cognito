import {types} from "../types/types";
import {Auth} from 'aws-amplify';

export const startLoginUsernamePassword = (username, password, tokenRecaptcha) => {
    return async (dispatch) => {

        try {
            dispatch(login(username, password));
            const auth = await Auth.signIn(
                username,
                password,
                {
                    captcha: tokenRecaptcha
                }
            );

            const lasestrellas_auth = {
                token: auth.signInUserSession.idToken,
                username: auth.username,
            }
            localStorage.setItem('lasestrellas_auth', JSON.stringify(lasestrellas_auth));
            dispatch(loginSuccess(username, password, lasestrellas_auth.token));
            // dispatch(validUser(username, password, auth))
        } catch (error) {
            dispatch(loginError(username, password, error.message));
            localStorage.removeItem('lasestrellas_auth');
        }
    }
}

export const validUser = (username, password, auth) => {
    return async (dispatch) => {
        const lasestrellas_auth = {
            token: auth.signInUserSession.idToken,
            username: auth.username,
        }
        localStorage.setItem('lasestrellas_auth', JSON.stringify(lasestrellas_auth));
        dispatch(loginSuccess(username, password, lasestrellas_auth.token));
    }
}

export const registerToCognito = (username, password, email, tokenRecaptcha) => {
    return async (dispatch) => {
        try {
            dispatch(register());

            await Auth.signUp({
                username,
                password,
                attributes: {
                    email, // optional
                },
                clientMetadata: {
                    captcha: tokenRecaptcha
                }
            });

            dispatch(registerSuccess());
        } catch (error) {
            dispatch(registerError(error.message));
            localStorage.removeItem('lasestrellas_auth');
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            await Auth.signOut({global: true});
            dispatch(logout());
            localStorage.removeItem('lasestrellas_auth');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}

// login
export const login = (username, password) => ({
    type: types.authLogin,
    payload: {
        username,
        password
    }
})

export const loginSuccess = (username, password, token) => ({
    type: types.authLoginSuccess,
    payload: {
        username,
        password,
        token,
        error: false,
    }
})

export const loginError = (username, password, error) => ({
    type: types.authLoginError,
    payload: {
        username,
        password,
        errorCode: error,
        token: null,
        error: true,
    }
})

export const logout = () => ({
    type: types.authLogout,
})


// register

export const register = () => ({
    type: types.authRegister,
    payload: {}
})

export const registerSuccess = () => ({
    type: types.authRegisterSuccess,
    payload: {
        error: false,
    }
})

export const registerError = (error) => ({
    type: types.authRegisterError,
    payload: {
        errorCode: error,
        error: true,
    }
})

export const resetRegister = () => ({
    type: types.authRegisterReset,
    payload: {}
})
