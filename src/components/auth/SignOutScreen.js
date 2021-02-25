import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {signOut} from "../../actions/auth";

const SignOutScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(signOut())

    }, [])

    return (
        <div>
            signing Out...
        </div>
    );
};

export default SignOutScreen;
