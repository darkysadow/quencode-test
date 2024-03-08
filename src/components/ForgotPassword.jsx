import React, { useState } from 'react'
import './ForgotPassword.css'
import CustomInput from './common/CustomInput';
import { authAPI } from '../api/api';

const ForgotPassword = ({setActiveComponent, setError}) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loginInputFocus, setLoginInputFocus] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false)

    const handleLoginInput = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setIsValidEmail(isValid);
    };

    const handleSubmit = async () => {
        setIsFetching(true);
        try {
            const res = await authAPI.passwordReset(email)
            console.log(res);
        } catch (error) {
            setIsFetching(false)
            setError(error.response.data);
        }
    }

    return (
        <>
            <div className='forgotPassword'>
                <h2 className='forgotPassword__header'>Forgot Password?</h2>
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className='forgotPassword__form'
                >
                    <CustomInput 
                        handleInputChange={handleLoginInput}
                        inputName={"forgotPasswordEmail"}
                        placeholder={"Enter your email"}
                        inputValue={email}
                        setInputFocus={setLoginInputFocus}
                        validationError={{
                            condition: loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail,
                            message: "Type the correct email"
                            
                        }}
                        disabled={isFetching}
                    />
                    <div className='forgotPassword__form__buttonGroup'>
                        <button 
                            className='forgotPassword__form__buttonGroup_send'
                            onClick={handleSubmit}
                            disabled={isFetching}
                        >
                            Send
                        </button>
                        <button 
                            className='forgotPassword__form__buttonGroup_cancel' 
                            onClick={() => setActiveComponent('Login')}
                            disabled={isFetching}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword