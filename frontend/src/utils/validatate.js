import * as Yup from 'yup';

const BasicSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Must be no longer than 20 characters')
    .required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 charachters length').required(),
});

export default BasicSchema;
