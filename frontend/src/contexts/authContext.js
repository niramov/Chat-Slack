import React, { useState, createContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const logIn = () => {
    console.log('loggin!!!');
    setLoggedIn(true);
    console.log('loggedIn!!!', loggedIn);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    console.log('userId now is', localStorage.getItem('userId'));
    setLoggedIn(false);
    // navigate('login');
  };

  return <AuthContext.Provider value={{ loggedIn, logOut, logIn }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
