import React from 'react';
import { useForm } from 'react-hook-form';

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit } = useForm();
  //register 는 input에서 받은값을 지정하고
  //watch는 register에 입력될때마다 값을 받음
  const onSubmit = () => {
    console.log(watch('email'));
  };
  const onInvalid = () => {
    console.log('cant ddd');
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {
              required: true,
              validate: (email: string) => email.includes('@gmail.com'),
            })}
            name="email"
            type="email"
            required
            placeholder="email"
          />
        </div>
        <div>
          <input
            {...register('password', { required: true })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300">Submit</button>
      </form>
    </div>
  );
};
