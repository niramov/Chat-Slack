import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './components/SignInPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import AuthProvider from './contexts/authContext.js';
import MainPage from './components/MainPage';
import Layout from './components/Layout.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import { io } from 'socket.io-client';
import SocketContext from './contexts/socketContext';
import ChatContextProvider from './contexts/chatApi';
import SignUpPage from './components/SignUpPage';

const socket = io('http://localhost:3000');

function App() {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <ChatContextProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<MainPage />} />
                  <Route path='login' element={<SignInPage />} />
                  <Route path='error' element={<ErrorPage />} />
                  <Route path='signup' element={<SignUpPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ChatContextProvider>
      </SocketContext.Provider>
    </Provider>
  );
}

export default App;
