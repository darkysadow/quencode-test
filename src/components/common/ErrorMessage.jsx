import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({ err, setUserError }) => {
    const deleteError = () => {
        setUserError(null)
    }
    return (    
        <div className='errorBar'>
            <div className='errorBar__message'>
                <button 
                    className='errorBar__message__close'
                    onClick={deleteError}
                >✖</button>
             <p>
                {
                    typeof(err.detail[0]) === 'string' ? err?.detail : err?.detail[0].error + " at " + err?.detail[0].field_name + " field"
                }
             </p>
             </div>
        </div>
    )
}

export default ErrorMessage