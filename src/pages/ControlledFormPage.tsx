import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';
import { validationSchema } from '../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Form.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
};

function ControlledFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.form.countries);

  const onSubmit = (data: FormData) => {
    const pictureFile = data.picture[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      const dataWithBase64Picture = {
        ...data,
        picture: base64String,
      };

      dispatch(saveFormData(dataWithBase64Picture));
      navigate('/');
    };

    reader.readAsDataURL(pictureFile);
  };

  const formFields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      register: register('name'),
      error: errors.name?.message,
    },
    {
      id: 'age',
      label: 'Age',
      type: 'text',
      register: register('age'),
      error: errors.age?.message,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      register: register('email'),
      error: errors.email?.message,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      register: register('password'),
      error: errors.password?.message,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      register: register('confirmPassword'),
      error: errors.confirmPassword?.message,
    },
    {
      id: 'country',
      label: 'Country',
      type: 'text',
      register: register('country'),
      error: errors.country?.message,
      list: 'countrydata',
      autocomplete: 'off',
    },
  ];

  return (
    <div className={styles.formContainer}>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <div key={field.id} className={styles.formGroup}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              list={field.list || undefined}
              autoComplete={field.autocomplete}
              {...field.register}
            />
            <div className={styles.errorMessage}>{field.error}</div>
          </div>
        ))}

        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <select {...field}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          />
          <div className={styles.errorMessage}>{errors.gender?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" {...register('picture')} />
          <div className={styles.errorMessage}>{errors.picture?.message}</div>
        </div>

        <div className={`${styles.formGroup} ${styles['checkbox-container']}`}>
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          <label htmlFor="acceptTerms">Accept Terms</label>
        </div>
        <div className={styles.errorMessage}>{errors.acceptTerms?.message}</div>

        <datalist id="countrydata">
          {countries &&
            countries.map((country) => {
              return <option key={country}>{country}</option>;
            })}
        </datalist>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ControlledFormPage;
