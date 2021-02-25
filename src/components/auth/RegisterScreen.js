import React, {useState} from 'react';
import {useForm} from "../../hooks/useForm";
import {useDispatch, useSelector} from "react-redux";
import {Spinner, Toast} from "react-bootstrap";
import {registerToCognito, resetRegister} from "../../actions/auth";

var Recaptcha = require('react-recaptcha');

const RegisterScreen = ({history}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [tokenRecaptcha, setTokenRecaptcha] = useState(null);
    const register = useSelector(state => state.register)

    const [formValues, handleInputChange] = useForm({
        username: '',
        password: '',
        email: ''
    })
    const {username, password, email} = formValues;

    // handles
    const handleRegister = async (e) => {
        e.preventDefault()

        if (!!tokenRecaptcha) {
            setLoading(true)
            await dispatch(registerToCognito(username, password, email))
            setLoading(false)
            setTimeout(() => {
                toggleToast()
                toLogin()
            }, 2000)
        }
    }

    // Recibimos el token y almacenamos su respuesta en un estado con el hook useState.
    const verifyCallback = async (response) => {
        setTokenRecaptcha(response);
    }

    const toggleToast = () => dispatch(resetRegister())
    const toLogin = () => history.replace('/auth/login');

    return (
        <div className='site-wrapper'>

            {
                register.init ?
                    register.error ?
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
                                    <Toast.Body>{register.errorCode}</Toast.Body>
                                </Toast>
                            </div>
                        ) :
                        (
                            <div style={{
                                zIndex: 1999999, position: 'absolute',
                                top: 10,
                                right: 10,
                            }}>
                                <Toast animation={true} autohide={true} onClose={toggleToast}>
                                    <Toast.Header>
                                        <strong className="mr-auto">Confirm account</strong>
                                    </Toast.Header>
                                    <Toast.Body>"We are send a email to confirm your account."</Toast.Body>
                                </Toast>
                            </div>
                        )
                    :
                    (<div/>)

            }

            <div className="container">
                <div className="row align-items-center intro  justify-content-center">
                    <div className="col-6">
                        <div className="login-container">
                            <h2 className="form-heading">Register</h2>

                            <form className="row" onSubmit={handleRegister} id="login-form">
                                <div className="input-group">
                                    <i className="fa fa-user" aria-hidden="true"/>
                                    <input required={true} tabIndex="1" className="form-control input-lg"
                                           name="username" type="text"
                                           value={username} onChange={handleInputChange}
                                           maxLength="100" title="Username" placeholder="Username"/>
                                </div>
                                <div className="input-group">
                                    <i className="fa fa-envelope-o" aria-hidden="true"/>
                                    <input required={true} tabIndex="1" className="form-control input-lg"
                                           name="email" type="text"
                                           value={email} onChange={handleInputChange}
                                           maxLength="100" title="Email" placeholder="Email"/>
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

                                <br/>
                                <a className="reset w-100" tabIndex="4" onClick={toLogin}>Already account?</a>
                            </form>

                            {/*<div className="social-login clearfix">
                                <p>- or sign in with -</p>
                                <ul className="social-buttons text-center">
                                    <li>
                                        <a href="" className="facebook"><i className="fa fa-facebook"
                                                                           aria-hidden="true"/></a>
                                    </li>
                                    <li>
                                        <a href="" className="twitter"><i className="fa fa-twitter" aria-hidden="true"/></a>
                                    </li>
                                    <li>
                                        <a href="" className="google-plus"><i className="fa fa-google-plus"
                                                                              aria-hidden="true"/></a>
                                    </li>
                                </ul>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
