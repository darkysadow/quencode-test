import React, { useState } from 'react'
import './Login.css'
import CustomInput from './common/CustomInput';
import { authAPI } from '../api/api';

const Login = ({ setActiveComponent, setError = () => {} }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [loginValidationErrors, setLoginValidationErrors] = useState([])
    const [passwordValidationErrors, setPasswordValidationErrors] = useState([])

    //Function for validate password input
    const validatePassword = (password, setError) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password should be at least 8 characters");
        }
        const hasNumeric = /\d/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (!hasNumeric || !hasUppercase || !hasLowercase) {
            errors.push("Password should contain at least one numeric, one uppercase, and one lowercase letter");
        }
        setError(errors)
    }

    //login input onChange handler
    const handleLoginInput = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        if (!isValid) {
            setLoginValidationErrors(['Type the correct Email'])
        } else {
            setLoginValidationErrors([])
        }
        setIsValidEmail(isValid);
    };


    //password input onChange handler
    const handlePasswordInput = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        validatePassword(inputPassword, setPasswordValidationErrors)
    }

    const handleSubmit = async () => {
        try {
            //Clear errors if user try to login
            setError(null)
            setIsFetching(true)
            const res = await authAPI.login(email, password).then(res => setIsFetching(false))
            //Adding tokens to cookies
            const accessExpirationDate = new Date(new Date().getTime() + res.token_expire * 1000);
            document.cookie = `access_token=${res.access_token} path=/ expires=${accessExpirationDate.toUTCString()}`
            const refreshExpirationDate = new Date(new Date().getTime() + res.refresh_token_expire * 1000);
            document.cookie = `refresh_token=${res.refresh_token} path=/ expires=${refreshExpirationDate.toUTCString()}`
            //Changing active component to component for authorized users
            setActiveComponent("Authorized")
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
                        validationErrors={loginValidationErrors}
                        disabled={isFetching}
                    />
                    
                    {isValidEmail && <div className='login__form__passwordContainer'>
                        <CustomInput 
                            handleInputChange={handlePasswordInput}
                            inputName={"loginPassword"}
                            placeholder={"Password"}
                            inputValue={password}
                            setShowPassword={setShowPassword}
                            isPasswordInput={true}
                            showPassword={showPassword}
                            validationErrors={passwordValidationErrors}
                            disabled={isFetching}
                        />
                        <div className='login__form__forgotPassword'>
                            <span onClick={() => setActiveComponent('Forgot Password')}>Forgot your password?</span>
                        </div>
                    </div>}
                    <button 
                        className='login__form__submit' 
                        disabled={passwordValidationErrors.length > 0 && passwordValidationErrors > 0}
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