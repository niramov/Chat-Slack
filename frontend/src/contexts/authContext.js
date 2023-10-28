import React, { useState, createContext, useMemo } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (response) => {
    console.log('response.data', response.data);
    localStorage.setItem('userId', JSON.stringify(response.data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('userId'));

    if (user && user?.token) {
      return { Authorization: `Bearer ${user?.token}` };
    }
    return {};
  };

  const getUserName = () => {
    const userName = JSON.parse(localStorage.getItem('userId'));
    return userName?.username;
  };

  const value = useMemo(
    () => ({
      loggedIn,
      logOut,
      logIn,
      getUserName,
      getAuthHeader,
    }),
    [loggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
