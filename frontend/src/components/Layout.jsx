import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import routes from '../routes/routes';

const Layout = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const logOutUser = () => {
    auth.logOut();
    navigate(routes.login());
  };
  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">{t('nav.logo')}</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end" />
          {auth.currentUser ? (
            <Button onClick={logOutUser}>{t('nav.exit')}</Button>
          ) : (
            <Button onClick={() => navigate(routes.login())}>{t('nav.enter')}</Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
