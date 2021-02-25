import React from 'react';
import ReactDOM from 'react-dom';
import {AuthApp} from "./AuthApp";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/styles.css"

import Amplify from 'aws-amplify';
import {awsconfig} from "./aws-exports";

Amplify.configure(awsconfig);

ReactDOM.render(
    <AuthApp/>,
    document.getElementById('root')
);
