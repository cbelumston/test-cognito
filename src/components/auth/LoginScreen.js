import React, {useEffect, useState} from 'react';
import {useForm} from "../../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {logout, startLoginUsernamePassword, validUser} from "../../actions/auth";
import {Spinner, Toast} from "react-bootstrap";
import {Auth, Hub} from "aws-amplify";

var Recaptcha = require('react-recaptcha');

const LoginScreen = ({history}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [manual, setManual] = useState(false);
    const [tokenRecaptcha, setTokenRecaptcha] = useState(null);
    const auth = useSelector(state => state.auth)

    const [formValues, handleInputChange] = useForm({
        username: '',
        password: ''
    })
    const {username, password} = formValues;

    // handles
    const handleLogin = async (e) => {
        e.preventDefault()

        if (tokenRecaptcha !== null) {
            setManual(true)
            setLoading(true)
            await dispatch(startLoginUsernamePassword(username, password, tokenRecaptcha))
            setLoading(false)
        }
    }

    // Recibimos el token y almacenamos su respuesta en un estado con el hook useState.
    const verifyCallback = async (response) => {
        setTokenRecaptcha(response);
    }
    const toggleToast = () => dispatch(logout())
    const toRegister = () => history.replace('/auth/register');

    useEffect(() => {

        Hub.listen('auth', ({payload: {event, data}}) => {
            // eslint-disable-next-line default-case
            switch (event) {
                case "signIn":
                    if (!manual) {
                        dispatch(validUser(username, password, data))
                    }
                    break;
                case "customOAuthState_signIn":
                    // dispatch(validUser(username, password, data))
                    break;
                default:
                    break;

            }
        });
    }, [tokenRecaptcha]);

    return (
        <div className='site-wrapper'>

            {
                auth.error &&
                (
                    <div style={{
                        zIndex: 1999999, position: 'absolute',
                        top: 10,
                        right: 10,
                    }}>
                        <Toast animation={true} autohide={true} onClose={toggleToast}>
                            <Toast.Header>
                                <strong className="mr-auto">Login Error</strong>
                            </Toast.Header>
                            <Toast.Body>{auth.errorCode}</Toast.Body>
                        </Toast>
                    </div>
                )
            }

            <div className="container">
                <div className="row align-items-center intro">
                    <div className="col-xs-12 col-sm-6 align-middle">
                        <h1 className="page-intro">lasestrellas.tv</h1>
                        <p>
                            Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Mauris blandit
                            aliquet elit, eget incident nib pulmonary a. Nella porttitor accumsan tincidunt. Donec
                            sollicitudin molestie malesuada.
                        </p>

                        <p><strong>New Here?</strong></p>
                        <a onClick={toRegister} className="btn signup">Sign Up</a>
                    </div>


                    <div className="col-xs-12 col-sm-6">
                        <div className="login-container">
                            <h2 className="form-heading">Inicia sesión</h2>

                            <form className="row" onSubmit={handleLogin} id="login-form">
                                <div className="input-group">
                                    <i className="fa fa-user" aria-hidden="true"/>
                                    <input required={true} tabIndex="1" className="form-control input-lg"
                                           name="username" type="text"
                                           value={username} onChange={handleInputChange}
                                           maxLength="100" title="Username" placeholder="Username"/>
                                </div>
                                <div className="input-group">
                                    <i className="fa fa-lock" aria-hidden="true"/>
                                    <input required={true} tabIndex="1" className="form-control input-lg"
                                           name="password"
                                           value={password} onChange={handleInputChange}
                                           type="password" maxLength="100" title="Password" placeholder="password"/>
                                </div>

                                <div style={{marginBottom: '20px', textAlign: "center", width: "100%"}}>

                                    <Recaptcha
                                        sitekey="6Ld7tGQaAAAAAHYNsE9KjVDFXhnF8ovKlaxSp4Sz"
                                        render="explicit"
                                        verifyCallback={verifyCallback}
                                    />
                                </div>

                                {
                                    tokenRecaptcha &&
                                    (
                                        <button type={"submit"} className="btn w-100">
                                            {
                                                !loading ?
                                                    (
                                                        <div>Sign In</div>
                                                    ) :
                                                    (
                                                        <Spinner animation="border" size="sm"/>
                                                    )
                                            }
                                        </button>
                                    )
                                }

                                <br/> <a className="reset w-100" tabIndex="4" href="./">Forgot password?</a>
                            </form>

                            <div className="social-login clearfix">
                                <p>- or sign in with -</p>
                                <ul className="social-buttons text-center">
                                    <li>
                                        <a className="facebook"
                                           onClick={() => Auth.federatedSignIn({customState: 'facebook'})}>
                                            <i className="fa fa-facebook" aria-hidden="true"/>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="" className="twitter"><i className="fa fa-twitter" aria-hidden="true"/></a>
                                    </li>*/}
                                    <li>
                                        <a className="google-plus"
                                           onClick={() => Auth.federatedSignIn({customState: 'google'})}>
                                            <i className="fa fa-google-plus" aria-hidden="true"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
