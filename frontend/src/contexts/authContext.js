import React, { useState, createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const setUserId = (response) => {
    localStorage.setItem('userId', JSON.stringify(response.data));
  };

  const getUserName = () => {
    const userName = JSON.parse(localStorage.getItem('userId'));
    return userName?.username;
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logOut, logIn, setUserId, getUserName }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
