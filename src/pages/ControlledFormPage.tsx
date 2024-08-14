import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveControlledData } from '../redux/slices/formSlice';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
  email: string;
};

function ControlledFormPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    dispatch(saveControlledData(data));
    navigate('/');
  };

  return (
    <div>
      <h2>Controlled Form (React Hook Form)</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register('name')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ControlledFormPage;
