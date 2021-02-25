export const setAuth = (auth) => {
    return async () => {
        localStorage.setItem('lasestrellas_auth', utf8_to_b64(JSON.stringify(auth)));
    }
}

export const getAuth = () => {
    return async () => {
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem('lasestrellas_auth') ? JSON.parse(b64_to_utf8(localStorage.getItem('lasestrellas_auth'))) : null;
    }
}

export const utf8_to_b64 = (str) => {
    return async () => {
        window.btoa(unescape(encodeURIComponent(str)));
    }
}

export const b64_to_utf8 = (str) => {
    return async () => {
        window.btoa(unescape(encodeURIComponent(str)));
    }
}
