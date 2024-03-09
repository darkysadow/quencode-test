import { useEffect, useState } from 'react';
import './App.css';
import textLogo from './textLogo.png'
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ErrorMessage from './components/common/ErrorMessage';

function App() {
  const [activeComponent, setActiveComponent] = useState('Login')

  //Errors for error snackbar
  const [userError, setUserError] = useState(null)

  //Getting tokens from cookies
  const allCookies = document.cookie
  const cookiesArray = allCookies?.split('; ');
  const accessTokenCookie = cookiesArray?.find(cookie => cookie.startsWith('access_token='))
  const accessToken = accessTokenCookie?.split("=")[1]

  //Redirect to component for authorized users
  useEffect(() => {
    accessToken !== undefined && setActiveComponent('Authorized')
  }, [accessToken])


  //This useEffect clear all user error when user change active tab
  //Useful when user comes to previous tab (click "Cancel")
  useEffect(() => {
    setUserError(null)
  }, [activeComponent])

  //This function returns exactly the component we need
  const renderer = () => {
    switch(activeComponent) {
      case 'Login':
        return <Login setActiveComponent={setActiveComponent} setError={setUserError} />
      case "Forgot Password":
        return <ForgotPassword setActiveComponent={setActiveComponent} setError={setUserError} />
      case "Reset Password":
        return <ResetPassword setActiveComponent={setActiveComponent} setError={setUserError} />
      case "Authorized":
        return <h1 style={{textAlign: "center"}}>Authorized. (Here must be redirect)</h1>
      default:
        return <Login setActiveComponent={setActiveComponent} setError={setUserError} />
    }
  }

  return (
    <>
    {/* Snackbar for errors */}
    {userError && <ErrorMessage err={userError} setUserError={setUserError} />}
    <main className='app__content container'>
      
      <div>
        <h1 className='app__content__logo'>
          <p style={{display: 'none'}}>Qencode</p>
          <img src={textLogo} alt="Qencode Logo" />
        </h1>
        {renderer()}
      </div>
    </main>
    </>
  );
}

export default App;
