import React from "react";
import AppRoutes from "./routes/AppRoutes";
import {Provider} from "react-redux";
import {store} from "./store/store";

export const AuthApp = () => {

    return (
        <Provider store={store}>
            <AppRoutes/>
        </Provider>
    )
}
