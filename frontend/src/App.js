import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginPage.jsx';
import ErrorPage from './pages/page404.jsx';
import AuthProvider from './contexts/authContext.js';
import MainPage from './components/MainPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
