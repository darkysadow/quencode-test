import React from 'react'
import "./CustomInput.css"

const CustomInput = ({
    inputName, placeholder, isPasswordInput = false,
    inputValue, handleInputChange, setInputFocus = () => {},
    showPassword = true, setShowPassword,
    inputLabel = undefined, validationErrors = [],
    disabled }) => {
    
    //Bool is input has validation errors
    const hasErrors = validationErrors.length > 0;

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
                    disabled={disabled}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    className={hasErrors ? "customInput_inputInvalid" : " "}
                />
                {
                    hasErrors && <span className='customInput__errMsg'>{validationErrors[0]}</span>
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