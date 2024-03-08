import React, { useState } from 'react'
import './ResetPassword.css'
import CustomInput from './common/CustomInput';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showSecondPassword, setShowSecondPassword] = useState(false)
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidSecondPassword, setIsValidSecondPassword] = useState('');
    const [passwordInputFocus, setPasswordInputFocus] = useState(undefined);
    const [secondPasswordInputFocus, setSecondPasswordInputFocus] = useState(undefined)


    const handlePasswordInput = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        const isValid = inputPassword.length >= 8;
        
        setIsValidPassword(isValid);
    }

    const handleSecondPasswordInput = (e) => {
        const inputPassword = e.target.value;
        setSecondPassword(inputPassword);
        const isValid = inputPassword.length >= 8;
        setIsValidSecondPassword(isValid);
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
                            inputFocus={passwordInputFocus}
                            setInputFocus={setPasswordInputFocus}
                            isValidInput={isValidPassword}
                            isPasswordInput={true}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            inputLabel={'Password'}
                            validationError={{
                                condition: (passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword) || ((password !== secondPassword) && (!passwordInputFocus && !secondPasswordInputFocus)),
                                message: (passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword) ? "Password should be at least 8 characters" : ((password !== secondPassword) && (!passwordInputFocus && !secondPasswordInputFocus)) && "Passwords do not match"
                            }}
                        />
                        <CustomInput
                            inputName={'secondPassword'}
                            placeholder={'Password'}
                            inputValue={secondPassword}
                            handleInputChange={handleSecondPasswordInput}
                            inputFocus={secondPasswordInputFocus}
                            setInputFocus={setSecondPasswordInputFocus}
                            isValidInput={isValidSecondPassword}
                            isPasswordInput={true}
                            showPassword={showSecondPassword}
                            setShowPassword={setShowSecondPassword}
                            inputLabel={'Confirm Password'}
                            validationError={{
                                condition: (secondPasswordInputFocus !== undefined && secondPasswordInputFocus !== true && !isValidSecondPassword) || ((password !== secondPassword) && (!passwordInputFocus && !secondPasswordInputFocus)),
                                message: (secondPasswordInputFocus !== undefined && secondPasswordInputFocus !== true && !isValidSecondPassword) ? "Password should be at least 8 characters" : ((password !== secondPassword) && (!passwordInputFocus && !secondPasswordInputFocus)) && "Passwords do not match"
                            }}
                        />
                    </div>
                    <button className='resetPassword__form__submit'>Reset Password</button>
                </form>

            </div>
        </>
    )
}

export default ResetPassword