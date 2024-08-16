import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';
import { validationSchema } from '../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Form.module.css';

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
          <div className={styles.ErrorMessage}>{errors.name?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input type="text" id="age" {...register('age')} />
          <div className={styles.ErrorMessage}>{errors.age?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} />
          <div className={styles.ErrorMessage}>{errors.email?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password')} />
          <div className={styles.ErrorMessage}>{errors.password?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
          />
          <div className={styles.ErrorMessage}>
            {errors.confirmPassword?.message}
          </div>
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
          <div className={styles.ErrorMessage}>{errors.gender?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="picture">Picture</label>
          <input type="file" id="picture" {...register('picture')} />
          <div className={styles.ErrorMessage}>{errors.picture?.message}</div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" {...register('country')} />
          <div className={styles.ErrorMessage}>{errors.country?.message}</div>
        </div>
        <div className={`${styles.formGroup} ${styles['checkbox-container']}`}>
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          <label htmlFor="acceptTerms">Accept Terms</label>
        </div>
        <div className={styles.ErrorMessage}>{errors.acceptTerms?.message}</div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ControlledFormPage;
