import React, { useState } from 'react'
import './Login.css'

const Login = ({ setActiveComponent }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loginInputFocus, setLoginInputFocus] = useState(undefined);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(undefined);

    const handleLoginInput = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setIsValidEmail(isValid);
    };

    const handlePasswordInput = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        const isValid = inputPassword.length >= 8;
        setIsValidPassword(isValid);
    }

    return (
        <>
            <div className='login'>
                <h2 className='login__header'>Log in to your account</h2>
                <div className='login__bySocial'>
                    <button>
                        <span className="_icon-google"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span>
                        Google
                    </button>
                    <button>
                        <span className='_icon-github'></span>
                        Github
                    </button>
                </div>
                <div className='login__hr'>
                    <span>or</span>
                </div>
                <form
                    className='login__form'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        name="workEmail"
                        id="workEmail"
                        placeholder='Work email'
                        value={email}
                        onChange={(e) => handleLoginInput(e)}
                        onFocus={() => setLoginInputFocus(true)}
                        onBlur={() => setLoginInputFocus(false)}
                        className={(loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail) ? "login__form__input_loginInvalid" : " "}
                    />
                    {(loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail) && <p className='login__form__incorrectLogin'>Type the correct email</p>}
                    {isValidEmail && <div className='login__form__passwordContainer'>
                        <div className='login__form__password'>
                            <input
                                type={showPassword ? "text" : 'password'}
                                name='loginPassword'
                                id='loginPassword'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => handlePasswordInput(e)}
                                onFocus={() => setPasswordInputFocus(true)}
                                onBlur={() => setPasswordInputFocus(false)}
                                className={(passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword) ? "login__form__input_loginInvalid" : " "}
                            />
                            <button className='login__form__showPassword' onClick={(e) => { showPassword ? setShowPassword(false) : setShowPassword(true); e.preventDefault() }}>
                                <span className='_icon-showPassword'></span>
                                {showPassword && <span className='login__form__showPassword_show'></span>}
                            </button>
                        </div>
                        <div className='login__form__forgotPassword'>
                            <span onClick={() => setActiveComponent('Forgot Password')}>Forgot your password?</span>
                        </div>
                    </div>}
                    {(isValidEmail && passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword) && <p className='login__form__incorrectLogin'>Password should be at least 8 characters</p>}
                    <button className='login__form__submit'>Log in to Qencode</button>
                </form>
            </div>
            <div className='signup'>
                <p>
                    Is your company new to Qencode?
                </p>
                <span>Sign up</span>
            </div>
        </>
    )
}

export default Login