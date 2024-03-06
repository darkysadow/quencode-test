import React, { useState } from 'react'
import './ForgotPassword.css'

const ForgotPassword = ({setActiveComponent}) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [loginInputFocus, setLoginInputFocus] = useState(undefined);

    const handleLoginInput = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setIsValidEmail(isValid);
    };

    return (
        <>
            <div className='forgotPassword'>
                <h2 className='forgotPassword__header'>Forgot Password?</h2>
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className='forgotPassword__form'
                >
                    <input 
                        type="email" 
                        name='forgotPasswordEmail' 
                        id='forgotPasswordEmail'
                        placeholder='Enter your email'
                        onFocus={() => setLoginInputFocus(true)}
                        onBlur={() => setLoginInputFocus(false)}
                        value={email}
                        onChange={(e) => handleLoginInput(e)}
                        className={(loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail) ? "forgotPassword__form__input_loginInvalid" : " "}
                    />
                    {(loginInputFocus !== undefined && loginInputFocus !== true && !isValidEmail) && <p className='forgotPassword__form__incorrectLogin'>Type the correct email</p>}
                    <div className='forgotPassword__form__buttonGroup'>
                        <button className='forgotPassword__form__buttonGroup_send'>
                            Send
                        </button>
                        <button 
                            className='forgotPassword__form__buttonGroup_cancel' 
                            onClick={() => setActiveComponent('Login')}
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