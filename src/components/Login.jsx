import React, { useState } from 'react'
import './Login.css'
import CustomInput from './common/CustomInput';
import { authAPI } from '../api/api';

const Login = ({ setActiveComponent, setError = () => {} }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loginInputFocus, setLoginInputFocus] = useState(undefined);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false)

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

    const handleSubmit = async () => {
        try {
            setError(null)
            setIsFetching(true)
            const res = await authAPI.login(email, password).then(res => setIsFetching(false))
            console.log(res);
        } catch (error) {
            setIsFetching(false)
            setError(error.response.data);
        }
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
                    <CustomInput 
                        handleInputChange={handleLoginInput}
                        inputName={'workEmail'}
                        inputValue={email}
                        placeholder={"Work email"}
                        setInputFocus={setLoginInputFocus}
                        validationError={{
                            condition: (loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail),
                            message: 'Type the correct Email'
                        }}
                        disabled={isFetching}
                    />
                    
                    {isValidEmail && <div className='login__form__passwordContainer'>
                        <CustomInput 
                            handleInputChange={handlePasswordInput}
                            inputName={"loginPassword"}
                            placeholder={"Password"}
                            inputValue={password}
                            setInputFocus={setPasswordInputFocus}
                            setShowPassword={setShowPassword}
                            isPasswordInput={true}
                            showPassword={showPassword}
                            validationError={{
                                condition: passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword,
                                message: 'Password should be at least 8 characters'
                            }}
                            
                            disabled={isFetching}
                        />
                        <div className='login__form__forgotPassword'>
                            <span onClick={() => setActiveComponent('Forgot Password')}>Forgot your password?</span>
                        </div>
                    </div>}
                    <button 
                        className='login__form__submit' 
                        disabled={!isValidEmail || !isValidPassword || isFetching}
                        onClick={handleSubmit}
                    >
                        {isFetching ? "Loading..." :"Log in to Qencode"}</button>
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