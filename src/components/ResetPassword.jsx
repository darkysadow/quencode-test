import React, { useState } from 'react'
import './ResetPassword.css'

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
                        <div className='resetPassword__form__password resetPassword__form__password_first'>
                            <input
                                type={showPassword ? "text" : 'password'}
                                name='firstPassword'
                                id='firstPassword'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => handlePasswordInput(e)}
                                onFocus={() => setPasswordInputFocus(true)}
                                onBlur={() => setPasswordInputFocus(false)}
                                className={(passwordInputFocus !== undefined && passwordInputFocus !== true && !isValidPassword) ? "resetPassword__form__input_loginInvalid" : " "}
                            />
                            <button className='resetPassword__form__showPassword' onClick={(e) => { showPassword ? setShowPassword(false) : setShowPassword(true); e.preventDefault() }}>
                                <span className='_icon-showPassword'></span>
                                {showPassword && <span className='resetPassword__form__showPassword_show'></span>}
                            </button>
                        </div>
                        {(!isValidPassword && !passwordInputFocus && passwordInputFocus !== undefined) && <p className='resetPassword__form__incorrectPassword'>Password should be at least 8 characters</p>}
                        <div className='resetPassword__form__password resetPassword__form__password_second'>
                            <input
                                type={showSecondPassword ? "text" : 'password'}
                                name='secondPassword'
                                id='secondPassword'
                                placeholder='Password'
                                value={secondPassword}
                                onChange={(e) => handleSecondPasswordInput(e)}
                                onFocus={() => setSecondPasswordInputFocus(true)}
                                onBlur={() => setSecondPasswordInputFocus(false)}
                                className={(secondPasswordInputFocus !== undefined && secondPasswordInputFocus !== true && !isValidSecondPassword) ? "resetPassword__form__input_loginInvalid" : " "}
                            />
                            <button className='resetPassword__form__showPassword' onClick={(e) => { showSecondPassword ? setShowSecondPassword(false) : setShowSecondPassword(true); e.preventDefault() }}>
                                <span className='_icon-showPassword'></span>
                                {showSecondPassword && <span className='resetPassword__form__showPassword_show'></span>}
                            </button>
                        </div>
                        {(!isValidSecondPassword && !secondPasswordInputFocus && secondPasswordInputFocus !== undefined) && <p className='resetPassword__form__incorrectPassword'>Password should be at least 8 characters</p>}
                        {(isValidSecondPassword && isValidPassword && !passwordInputFocus && !secondPasswordInputFocus && (secondPassword !== password)) && <p className='resetPassword__form__incorrectPassword'>Passwords do not match</p>}
                    </div>
                    <button className='resetPassword__form__submit'>Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword