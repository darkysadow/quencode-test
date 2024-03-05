import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false)

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
                    <input type="email" name="workEmail" id="workEmail" placeholder='Work email' />

                    <div className='login__form__password'>
                        <input
                            type={showPassword ? "text" : 'password'}
                            name='loginPassword'
                            id='loginPassword'
                            placeholder='Password' />
                        <button className='login__form__showPassword' onClick={(e) => { showPassword ? setShowPassword(false) : setShowPassword(true); e.preventDefault() }}>
                            <span className='_icon-showPassword'></span>
                            {showPassword && <span className='login__form__showPassword_show'></span>}
                        </button>
                    </div>

                    <button className='login__form__submit'>Log in to Qencode</button>
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