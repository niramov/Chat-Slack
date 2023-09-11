import React from 'react';
import { useFormik } from 'formik';
import BasicSchema from '../utils/validatate.js';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    BasicSchema,
    onSubmit: (values) => console.log(values),
  });
  const { handleSubmit, handleChange, values, touched } = formik;

  return (
    <div className='container-fluid h-100 mt-4'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <Form className='form-container mt-3 mt-mb-0' onSubmit={handleSubmit}>
                <h2 className='text-center mb-4'>Войти</h2>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                    id='username'
                    name='username'
                    onChange={handleChange}
                    value={values.username}
                    type='text'
                  />
                  <Form.Label htmlFor='username'>Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className='form-floating mb-3'>
                  <Form.Control
                    id='password'
                    name='password'
                    onChange={handleChange}
                    values={values.password}
                    type='password'
                  />
                  <Form.Label htmlFor='password'>Ваш пароль</Form.Label>
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
          <span>Нет аккаунта?</span> <Link to='/signup'>Регистрация</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
