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
import { PasswordIndicator } from '../components/PasswordIndicator';
import { usePasswordStrength } from '../customHooks/usePasswordStrength';

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

  const { passwordChecks, handlePasswordChange } = usePasswordStrength();
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

  return (
    <div className={styles.formContainer}>
      <h2>Controlled Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && (
            <div className={styles.errorMessage}>{errors.name.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input type="text" id="age" {...register('age')} />
          {errors.age && (
            <div className={styles.errorMessage}>{errors.age.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <PasswordIndicator passwordChecks={passwordChecks} />
          {errors.password && (
            <div className={styles.errorMessage}>{errors.password.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            {...register('country')}
            list="countrydata"
            autoComplete="off"
          />
          {errors.country && (
            <div className={styles.errorMessage}>{errors.country.message}</div>
          )}
        </div>

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
          {errors.gender && (
            <div className={styles.errorMessage}>{errors.gender.message}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" {...register('picture')} />
          {errors.picture && (
            <div className={styles.errorMessage}>{errors.picture.message}</div>
          )}
        </div>

        <div className={`${styles.formGroup} ${styles['checkbox-container']}`}>
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          <label htmlFor="acceptTerms">Accept Terms</label>
          {errors.acceptTerms && (
            <div className={styles.errorMessage}>
              {errors.acceptTerms.message}
            </div>
          )}
        </div>

        <datalist id="countrydata">
          {countries &&
            countries.map((country) => (
              <option key={country} value={country} />
            ))}
        </datalist>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ControlledFormPage;
