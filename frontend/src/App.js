import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage.jsx';
import ErrorPage from './pages/page404.jsx';
import AuthContext from './contexts/authContext';
import useAuth from './hooks/useAuth';

function App() {
  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = () => {
      console.log('loggin!!!');
      return setLoggedIn(true);
    };
    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    };

    return <AuthContext.Provider value={{ loggedIn, logOut, logIn }}>{children}</AuthContext.Provider>;
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' element={<ErrorPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
