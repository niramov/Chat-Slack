import React, { useState, createContext, useMemo } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState('');

  const logIn = (response) => {
    const userName = response.data.username;
    setLoggedIn(userName);
    const user = JSON.parse(localStorage.getItem(`userId_${userName}`)) || {};
    user[userName] = response.data;
    console.log('user', user);
    localStorage.setItem(`userId_${userName}`, JSON.stringify(user));
    console.log('getItem', localStorage.getItem(`userId_${userName}`));
  };

  const logOut = () => {
    localStorage.removeItem(`userId_${loggedIn}`);
    setLoggedIn('');
  };

  const getAuthHeader = () => {
    console.log('loggedIn1', loggedIn);
    const user = JSON.parse(localStorage.getItem(`userId_${loggedIn}`));
    console.log('USER!!!', user);

    if (user && user?.[loggedIn].token) {
      return { Authorization: `Bearer ${user?.[loggedIn].token}` };
    }
    return {};
  };

  const getUserName = () => {
    console.log('loggedIn', loggedIn);
    const userName = JSON.parse(localStorage.getItem(`userId_${loggedIn}`));
    console.log('current username', userName);
    return userName?.[loggedIn].username;
  };

  const value = useMemo(
    () => ({
      loggedIn,
      logOut,
      logIn,
      getUserName,
      getAuthHeader,
    }),
    [loggedIn, getUserName, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
