import React, {useEffect} from 'react';
import {Auth} from "aws-amplify";

const FacebookLoginScreen = () => {

    useEffect(() => {
        if (!window.FB) createScript();
    }, [])

    const signIn = () => {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                getAWSCredentials(response.authResponse);
            } else {
                fb.login(
                    response => {
                        if (!response || !response.authResponse) {
                            return;
                        }
                        getAWSCredentials(response.authResponse);
                    },
                    {
                        // the authorized scopes
                        scope: 'public_profile,email'
                    }
                );
            }
        });
    }

    const getAWSCredentials = (response) => {
        const {accessToken, expiresIn} = response;
        const date = new Date();
        const expires_at = expiresIn * 1000 + date.getTime();
        if (!accessToken) {
            return;
        }

        const fb = window.FB;
        fb.api('/me', {fields: 'name,email'}, response => {
            const user = {
                name: response.name,
                email: response.email
            };

            Auth.federatedSignIn('facebook', {token: accessToken, expires_at}, user)
                .then(credentials => {
                    console.log(credentials);
                });
        });
    }

    const createScript = () => {
        // load the sdk
        window.fbAsyncInit = fbAsyncInit;
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.onload = initFB;
        document.body.appendChild(script);
    }

    const initFB = () => {
        const fb = window.FB;
        console.log('FB SDK initialized');
    }

    const fbAsyncInit = () => {
        // init the fb sdk client
        const fb = window.FB;
        fb.init({
            appId: '690657391628258',
            cookie: true,
            xfbml: true,
            version: 'v2.11'
        });
    }

    return (
        <div>
            <button onClick={signIn}>Sign in with Facebook</button>
        </div>
    );
};

export default FacebookLoginScreen;
