import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignUpForm = () => {
  return (
    <Form /* onSubmit={handleSubmit} */>
      <h2 className='text-center mb-4'>Регистрация</h2>
      <Form.Group className='form-floating mb-3'>
        <Form.Control
          id='username'
          name='username'
          // onChange={onChange}
          // ref={inputRef}
          // value={values.username}
          type='text'
          // isInvalid={
          //   (touched.username && !!errors.username)
          //   || existingUser
          //   || authFailed
          // }
        />
        <Form.Label htmlFor='username'>Имя пользователя</Form.Label>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          id='password'
          name='password'
          // onChange={handleChange}
          // value={values.password}
          type='password'
          // isInvalid={(touched.password && !!errors.password) || authFailed}
        />
        <Form.Label htmlFor='password'>Пароль</Form.Label>
      </Form.Group>
      <Form.Group className='form-floating mb-4'>
        <Form.Control
          id='passwordConfirm'
          name='passwordConfirm'
          // onChange={handleChange}
          // value={values.passwordConfirm}
          type='password'
          // isInvalid={
          //   (touched.passwordConfirm && !!errors.passwordConfirm) || authFailed
          // }
        />
        <Form.Label htmlFor='passwordConfirm'>Подтверждение пароля</Form.Label>
      </Form.Group>
      <Button /* disabled={isSubmitting} */ className='w-100 mb-3' variant='primary' type='submit'>
        Подтвердить
      </Button>
    </Form>
  );
};
export default SignUpForm;
