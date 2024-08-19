import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[А-ЯA-Z]/, 'Name should start with an uppercase letter')
    .matches(/^[\w\W]+$/, 'Invalid characters in name'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age should be a number')
    .positive('Age should be a positive number'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(/(?=.*[0-9])/, 'Password should contain at least one number')
    .matches(
      /(?=.*[A-Z])/,
      'Password should contain at least one uppercase letter',
    )
    .matches(
      /(?=.*[a-z])/,
      'Password should contain at least one lowercase letter',
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      'Password should contain at least one special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords should match')
    .required('Confirm your password'),
  gender: Yup.string().required('Gender is required'),
  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  picture: Yup.mixed<FileList>()
    .required('You should choose a picture')
    .test('fileSize', 'File too large, should be less than 5MB', (value) => {
      return value && value[0] && value[0].size <= 5000000;
    })
    .test(
      'fileType',
      'Unsupported file format, should be PNG or JPEG',
      (value) => {
        return (
          value &&
          value[0] &&
          ['image/jpeg', 'image/png'].includes(value[0].type)
        );
      },
    ),
  country: Yup.string().required('Country is required'),
});
