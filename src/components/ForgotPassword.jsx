import React, { useState } from 'react'
import './ForgotPassword.css'
import CustomInput from './common/CustomInput';

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
                    />
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