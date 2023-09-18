import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage.jsx';
import ErrorPage from './components/page404.jsx';
import AuthProvider from './contexts/authContext.js';
import MainPage from './components/MainPage';
import Layout from './components/Layout.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='error' element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
