import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes/routes.js';
import useAuth from '../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';

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
    username: Yup.string().min(3, t('schema.nameMin')).max(20, t('schema.nameMax')).required(t('schema.required')),
    password: Yup.string().min(6, t('schema.passwordMin')).required(t('schema.required')),
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
          console.log('error!!!');
          setAuthFailed(true);
          auth.logOut();
          return false;
        }
        // throw error;
      }
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <div className='container-fluid h-100 mt-4'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <Form className='form-container mt-3 mt-mb-0' onSubmit={handleSubmit}>
                <h2 className='text-center mb-4'>{t('login.enter')}</h2>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                    id='username'
                    name='username'
                    ref={inputRef}
                    onChange={handleChange}
                    value={values.username}
                    type='text'
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                  <Form.Label htmlFor='username'>{t('login.name')}</Form.Label>
                </Form.Group>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                    id='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    type='password'
                    isInvalid={(touched.password && errors.password) || authFailed}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password ?? 'Нет такого пользователя'}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor='password'>{t('login.password')}</Form.Label>
                </Form.Group>
                <Button className='w-100 mb-3' variant='primary' type='submit'>
                  Войти
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className='card-footer p-4'>
        <div className='text-center'>
          <span>{t('login.noAccount')}</span> <Link to='/signup'>{t('login.register')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
