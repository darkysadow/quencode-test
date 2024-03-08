import { useState } from 'react';
import './App.css';
import textLogo from './textLogo.png'
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [activeComponent, setActiveComponent] = useState('Login')

  const renderer = () => {
    switch(activeComponent) {
      case 'Login':
        return <Login setActiveComponent={setActiveComponent} />
      case "Forgot Password":
        return <ForgotPassword setActiveComponent={setActiveComponent} />
      case "Reset Password":
        return <ResetPassword />
      default:
        return <Login setActiveComponent={setActiveComponent} />
    }
  }

  return (
    <main className='app__content container'>
      <div>
        <h1 className='app__content__logo'>
          <p style={{display: 'none'}}>Qencode</p>
          <img src={textLogo} alt="Qencode Logo" />
        </h1>
        {renderer()}
      </div>
    </main>
  );
}

export default App;
