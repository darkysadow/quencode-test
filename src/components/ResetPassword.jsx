import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import CustomInput from './common/CustomInput';
import { authAPI } from '../api/api';

const ResetPassword = ({setActiveComponent, setError}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showSecondPassword, setShowSecondPassword] = useState(false)
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    //Function for validate 2 password fields
    const validatePasswords = (password, secondPassword, setErrors) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password should be at least 8 characters");
        }
        if ((password !== secondPassword)) {
            errors.push("Passwords do not match");
        }
        const hasNumeric = /\d/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (!hasNumeric || !hasUppercase || !hasLowercase) {
            errors.push("Password should contain at least one numeric, one uppercase, and one lowercase letter");
        }

        setErrors(errors);
    }

    //onChange first password handler
    const handlePasswordInput = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        validatePasswords(inputPassword, secondPassword, setValidationErrors);
    }

    //onChange second password handler
    const handleSecondPasswordInput = (e) => {
        const inputPassword = e.target.value;
        setSecondPassword(inputPassword);
        validatePasswords(password, inputPassword, setValidationErrors);
    }

    const handleSubmit = async () => {
        try {
            //getting token and csrf from URL
            const urlParams = new URLSearchParams(window.location.search);
            const csrfTokenFromUrl = urlParams.get('secret');
            const tokenFromUrl = urlParams.get('token')
            //request for password reset to API
            const res = await authAPI.passwordSet(tokenFromUrl, csrfTokenFromUrl, password)
            //If succeed - change component to Login
            setActiveComponent("Login")
        } catch (error) {
            //Sending error body to ErrorMessage component
            setError(error.response.data);
        }
    }

    return (
        <>
            <div className='resetPassword'>
                <h2 className='resetPassword__header'>Create new Password?</h2>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className='resetPassword__form'
                >
                    <div className='resetPassword__form__inputContainer'>
                        <CustomInput
                            inputName={'firstPassword'}
                            placeholder={'Password'}
                            inputValue={password}
                            handleInputChange={handlePasswordInput}
                            isPasswordInput={true}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            inputLabel={'Password'}
                            validationErrors={validationErrors}
                        />
                        <CustomInput
                            inputName={'secondPassword'}
                            placeholder={'Password'}
                            inputValue={secondPassword}
                            handleInputChange={handleSecondPasswordInput}
                            isPasswordInput={true}
                            showPassword={showSecondPassword}
                            setShowPassword={setShowSecondPassword}
                            inputLabel={'Confirm Password'}
                            validationErrors={validationErrors}
                        />
                    </div>
                    <button 
                        className='resetPassword__form__submit'
                        onClick={handleSubmit}
                        disabled={validationErrors.length > 0}
                    >Reset Password</button>
                </form>

            </div>
        </>
    )
}

export default ResetPassword