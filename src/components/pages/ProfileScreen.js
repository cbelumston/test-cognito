import React from 'react';
import {useSelector} from "react-redux";
import {Auth} from "aws-amplify";

const ProfileScreen = () => {


    const auth = useSelector(state => state.auth)

   /* Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
        .catch(err => console.log(err));*/

    return (
        <div>
            <h1>Hi! {auth.username}</h1>
        </div>
    );
};

export default ProfileScreen;
