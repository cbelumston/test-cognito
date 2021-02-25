import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import {PrivateRoute} from "./PrivateRoutes";
import RegisterScreen from "../components/auth/RegisterScreen";
import ProfileScreen from "../components/pages/ProfileScreen";

import {useSelector} from "react-redux";
import {PublicRoute} from "./PublicRoute";
import SignOutScreen from "../components/auth/SignOutScreen";
import FacebookLoginScreen from "../components/auth/FacebookLoginScreen";

const AppRoutes = () => {

    const auth = useSelector(state => state.auth)

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path="/auth/login"
                    component={LoginScreen}
                    isAuthenticated={!!auth.token}
                />

                <PublicRoute
                    path="/auth/register"
                    component={RegisterScreen}
                    isAuthenticated={!!auth.token}
                />

                <PublicRoute
                    path="/auth/facebook"
                    component={FacebookLoginScreen}
                    isAuthenticated={!!auth.token}
                />

                <PrivateRoute
                    path="/auth/signOut"
                    component={SignOutScreen}
                    isAuthenticated={!!auth.token}
                />

                <PrivateRoute
                    path="/"
                    component={ProfileScreen}
                    isAuthenticated={!!auth.token}
                />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
