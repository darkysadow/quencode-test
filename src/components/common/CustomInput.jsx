import React from 'react'
import "./CustomInput.css"

const CustomInput = ({ 
    inputName, placeholder, isPasswordInput = false, 
    inputValue, handleInputChange, setInputFocus, 
    showPassword = true, setShowPassword,
    inputLabel = undefined, validationError }) => {
        
    return (
        <div className='customInput'>
            {inputLabel && <p className='customInput__label'>{inputLabel}</p>}
            <div className='customInput__container'>
                <input
                    type={showPassword ? "text" : 'password'}
                    name={inputName}
                    id={inputName}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    className={(validationError?.condition) ? "customInput_inputInvalid" : " "}
                />
                {
                   ( validationError?.condition ) && <span className='customInput__errMsg'>{validationError.message}</span>
                }
                {
                    isPasswordInput && <button className='customInput__showPassword' onClick={(e) => { showPassword ? setShowPassword(false) : setShowPassword(true); e.preventDefault() }}>
                        <span className='_icon-showPassword'></span>
                        {showPassword && <span className='customInput__showPassword_show'></span>}
                    </button>
                }
            </div>

        </div>
    )
}

export default CustomInput