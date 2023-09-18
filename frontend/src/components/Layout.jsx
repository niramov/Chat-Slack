import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const logOutUser = () => {
    auth.logOut();
    navigate('login');
  };
  return (
    <>
      <Navbar bg='light' expand='lg' className='shadow-sm'>
        <Container>
          <Navbar.Brand href='/'>Free chat</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end' />
          {auth.loggedIn ? (
            <Button onClick={logOutUser}>Выйти</Button>
          ) : (
            <Button onClick={() => navigate('login')}>Войти</Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
