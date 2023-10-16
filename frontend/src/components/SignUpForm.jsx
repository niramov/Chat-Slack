import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../routes/routes';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthStatus] = useState(false);
  const [isUserExist, setUserStatus] = useState(false);
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required(t('schema.requried')).min(3, t('schema.nameMin')).max(20, t('schema.nameMax')),
    password: Yup.string().min(6, t('schema.passwordMin')).required('schema.required'),
    passwordConfirm: Yup.string()
      .required(t('schema.required'))
      .oneOf([Yup.ref('password'), null], t('schema.confirmPassword')),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirm: '' },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { username, password } = values;
        const newUserData = { username, password };
        const response = await axios.post(routes.signUpPath(), newUserData);
        auth.setUserId(response);
        auth.logIn();
        navigate('/');
      } catch (error) {
        if (error.isAxiosError && error.response.status === 409) {
          auth.logOut();
          setUserStatus(true);
          setAuthStatus(true);
          setSubmitting(false);
          return false;
        }
        if (error.isAxiosError && error.response.status === 401) {
          setAuthStatus(true);
          return false;
        }
        throw error;
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, isSubmitting } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className='text-center mb-4'>{t('signup.register')}</h2>
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
        <Form.Label htmlFor='username'>{t('signup.name')}</Form.Label>
        <Form.Control.Feedback>{errors.username ? <div>{errors.username}</div> : null}</Form.Control.Feedback>
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
        <Form.Label htmlFor='password'>{t('signup.password')}</Form.Label>
        <Form.Control.Feedback type='invalid'>
          {errors.password ? <div>{errors.password}</div> : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          id='passwordConfirm'
          name='passwordConfirm'
          onChange={handleChange}
          value={values.passwordConfirm}
          type='password'
          isInvalid={(touched.passwordConfirm && !!errors.passwordConfirm) || authFailed}
        />
        <Form.Label htmlFor='passwordConfirm'>{t('signup.passwordConfirm')}</Form.Label>
        <Form.Control.Feedback type='invalid'>
          {errors.passwordConfirm ? <div>{errors.passwordConfirm}</div> : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Button disabled={isSubmitting} className='w-100 mb-3' variant='primary' type='submit'>
        {t('signup.confirm')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
