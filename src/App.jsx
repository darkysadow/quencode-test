import { useEffect, useState } from 'react';
import './App.css';
import textLogo from './textLogo.png'
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ErrorMessage from './components/common/ErrorMessage';

function App() {
  const [activeComponent, setActiveComponent] = useState('Login')
  const [userError, setUserError] = useState(null)
  const allCookies = document.cookie
  const cookiesArray = allCookies?.split('; ');
  const accessTokenCookie = cookiesArray?.find(cookie => cookie.startsWith('access_token='))
  const accessToken = accessTokenCookie?.split("=")[1]

  useEffect(() => {
    accessToken !== undefined && setActiveComponent('Authorized')
  }, [accessToken])

  useEffect(() => {
    setUserError(null)
  }, [activeComponent])

  const renderer = () => {
    switch(activeComponent) {
      case 'Login':
        return <Login setActiveComponent={setActiveComponent} setError={setUserError} />
      case "Forgot Password":
        return <ForgotPassword setActiveComponent={setActiveComponent} />
      case "Reset Password":
        return <ResetPassword />
      case "Authorized":
        return <h1 style={{textAlign: "center"}}>Authorized. (Here must be redirect)</h1>
      default:
        return <Login setActiveComponent={setActiveComponent} />
    }
  }

  return (
    <>
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
