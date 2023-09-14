import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    console.log('loggin!!!');
    setLoggedIn(true);
    console.log('loggedIn!!!', loggedIn);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  useEffect(() => {
    // Этот код будет выполняться после каждого изменения состояния loggedIn
    console.log('loggedIn изменился:', loggedIn);
  }, [loggedIn]);

  return <AuthContext.Provider value={{ loggedIn, logOut, logIn }}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
