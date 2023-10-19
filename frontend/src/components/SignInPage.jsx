import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Container, Card, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes.js';
import useAuth from '../hooks/useAuth.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const SignInSchema = Yup.object().shape({
    username: Yup.string().required(t('schema.required')),
    password: Yup.string().required(t('schema.required')),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.setUserId(response);
        auth.logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          auth.logOut();
          return false;
        }
        throw error;
      }
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <>
      <Container fluid className="h-100 m-3">
        <Row className="justify-content-center align-items-center h100">
          <Card style={{ width: '30rem' }} className="text-center shadow-sm">
            <Card.Body className="row">
              <Form className="form-container mt-3 mt-mb-0" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">{t('login.enter')}</h2>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    ref={inputRef}
                    onChange={handleChange}
                    value={values.username}
                    type="text"
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                  <Form.Label htmlFor="username">{t('login.name')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    isInvalid={(touched.password && errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password ?? t('login.error')}</Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                </Form.Group>
                <Button className="w-100 mb-3" variant="primary" type="submit">
                  Войти
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('login.noAccount')}</span>
          <Link to="/signup">{t('login.register')}</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
