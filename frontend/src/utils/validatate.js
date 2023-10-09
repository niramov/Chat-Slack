import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .required('Required'),
  password: Yup.string().min(5, 'Must be at least 5 charachters length').required('Required'),
});

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .required('Required'),
  password: Yup.string().min(5, 'Must be at least 5 charachters length').required('Required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Пароль должен совпадать'),
  // .required('Обязательное поле'),
});

export { SignInSchema, SignUpSchema };
