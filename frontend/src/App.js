import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import SignInPage from './components/SignInPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import AuthProvider from './contexts/authContext.js';
import MainPage from './components/MainPage';
import Layout from './components/Layout.jsx';
import store from './store/store';
import SocketContext from './contexts/socketContext';
import ChatContextProvider from './contexts/chatApi';
import SignUpPage from './components/SignUpPage';
import i18next from './locales/init';
import 'react-toastify/dist/ReactToastify.css';

const socket = io();

const App = () => (
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <I18nextProvider value={i18next}>
        <ChatContextProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<MainPage />} />
                  <Route path="login" element={<SignInPage />} />
                  <Route path="error" element={<ErrorPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                </Route>
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </AuthProvider>
        </ChatContextProvider>
      </I18nextProvider>
    </SocketContext.Provider>
  </Provider>
);

export default App;
