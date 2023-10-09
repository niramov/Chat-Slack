import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { SignUpSchema } from '../utils/validatate';
import routes from '../routes/routes';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [authFailed, setAuthStatus] = useState(false);
  const [isUserExist, setUserStatus] = useState(false);
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { username, password } = values;
        const newUserData = { username, password };
        const response = await axios(routes.signUpPath(), newUserData);
        auth.setUserId(response);
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.status === 409) {
          auth.logOut();
          setUserStatus(true);
          setAuthStatus(true);
          setSubmitting(false);
          return false;
        }
        if (error.isAxiosError && error.status === 401) {
          setAuthStatus(true);
          return false;
        }
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, isSubmitting } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className='text-center mb-4'>Регистрация</h2>
      <Form.Group className='form-floating mb-3'>
        <Form.Control
          id='username'
          name='username'
          onChange={handleChange}
          value={values.username}
          type='text'
          ref={inputRef}
          isInvalid={(touched.username && !!errors.username) || isUserExist || authFailed}
        />
        <Form.Label htmlFor='username'>Имя пользователя</Form.Label>
        <Form.Feedback>{errors.username ? <div>{errors.username}</div> : null}</Form.Feedback>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          id='password'
          name='password'
          onChange={handleChange}
          value={values.password}
          type='password'
          isInvalid={(touched.password && !!errors.password) || authFailed}
        />
        <Form.Label htmlFor='password'>Пароль</Form.Label>
        <Form.Feedback>{errors.password ? <div>{errors.password}</div> : null}</Form.Feedback>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          id='passwordConfirm'
          name='passwordConfirm'
          onChange={handleChange}
          value={values.passwordConfirm}
          type='password'
          isInvalid={touched.passwordConfirm || !!errors.passwordConfirm || authFailed}
        />
        <Form.Label htmlFor='passwordConfirm'>Подтверждение пароля</Form.Label>
      </Form.Group>
      <Button disabled={isSubmitting} className='w-100 mb-3' variant='primary' type='submit'>
        Подтвердить
      </Button>
    </Form>
  );
};

export default SignUpForm;