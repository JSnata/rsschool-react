import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';
import { validationSchema } from '../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register('name')} />
        {errors.name && <div>{errors.name.message}</div>}
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" {...register('age')} />
        {errors.age && <div>{errors.age.message}</div>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <div>{errors.email.message}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <div>{errors.password.message}</div>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
      </div>

      <div>
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
        {errors.gender && <div>{errors.gender.message}</div>}
      </div>

      <div>
        <label htmlFor="acceptTerms">Accept Terms</label>
        <input type="checkbox" id="acceptTerms" {...register('acceptTerms')} />
        {errors.acceptTerms && <div>{errors.acceptTerms.message}</div>}
      </div>

      <div>
        <label htmlFor="picture">Picture</label>
        <input type="file" id="picture" {...register('picture')} />
        {errors.picture && <div>{errors.picture.message}</div>}
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" {...register('country')} />
        {errors.country && <div>{errors.country.message}</div>}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default ControlledFormPage;
