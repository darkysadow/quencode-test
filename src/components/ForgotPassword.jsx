import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import CustomInput from './common/CustomInput';
import { authAPI } from '../api/api';

const ForgotPassword = ({setActiveComponent, setError}) => {
    const [email, setEmail] = useState('');
    const [isFetching, setIsFetching] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        console.log(validationErrors);
    }, [validationErrors])

    const handleLoginInput = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        if (!isValid) {
            setValidationErrors(['Type the correct Email'])
        } else {
            setValidationErrors([])
        }
    };
    const handleSubmit = async () => {
        setIsFetching(true);
        try {
            const res = await authAPI.passwordReset(email)
            const currenturl = window.location.href
            const resetPasswordUrl = `${currenturl}?token=your_token&secret=your_secret_token`;
            window.history.pushState({ path: resetPasswordUrl }, '', resetPasswordUrl);
            setActiveComponent("Reset Password")
            
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
                        validationErrors={validationErrors}
                        disabled={isFetching}
                    />
                    <div className='forgotPassword__form__buttonGroup'>
                        <button 
                            className='forgotPassword__form__buttonGroup_send'
                            onClick={handleSubmit}
                            disabled={isFetching || validationErrors.length > 0}
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