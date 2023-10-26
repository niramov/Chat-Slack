import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from './routes/routes';
import SignInPage from './components/SignInPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import AuthProvider from './contexts/authContext.js';
import MainPage from './components/MainPage';
import Layout from './components/Layout.jsx';
import SocketContext from './contexts/socketContext';
import ChatContextProvider from './contexts/chatApi';
import SignUpPage from './components/SignUpPage';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to={routes.login()} />;
};

const App = ({ socket }) => (
  <SocketContext.Provider value={socket}>
    <ChatContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.main()} element={<Layout />}>
              <Route
                index
                element={(
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
                )}
              />
              <Route path={routes.login()} element={<SignInPage />} />
              <Route path={routes.error()} element={<ErrorPage />} />
              <Route path={routes.signup()} element={<SignUpPage />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </ChatContextProvider>
  </SocketContext.Provider>
);

export default App;
