import React, {
  useState,
  createContext,
  useMemo,
  useCallback,
} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logIn = useCallback((response) => {
    const userName = response.data.username;
    setCurrentUser(userName);
    const user = JSON.parse(localStorage.getItem(`userId_${userName}`)) || {};
    user[userName] = response.data;
    localStorage.setItem(`userId_${userName}`, JSON.stringify(user));
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem(`userId_${currentUser}`);
    setCurrentUser(null);
  }, [currentUser]);

  const getAuthHeader = useCallback(() => {
    const user = JSON.parse(localStorage.getItem(`userId_${currentUser}`));

    if (user && user[currentUser] && user[currentUser].token) {
      return { Authorization: `Bearer ${user[currentUser].token}` };
    }
    return {};
  }, [currentUser]);

  const getUserName = useCallback(() => {
    const userNameData = JSON.parse(localStorage.getItem(`userId_${currentUser}`));
    return userNameData?.[currentUser]?.username;
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      logOut,
      logIn,
      getUserName,
      getAuthHeader,
    }),
    [currentUser, logOut, logIn, getUserName, getAuthHeader],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
