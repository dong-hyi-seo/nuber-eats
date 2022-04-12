import React from 'react';
import { useForm } from 'react-hook-form';
//useForm 과 typescript 통합
interface IForm {
  email: string;
  password: string;
}
export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  //register 는 input에서 받은값을 지정하고
  //watch는 register에 입력될때마다 값을 받음

  //react form 제출 함수
  const onSubmit = () => {
    console.log(watch('email'));
  };

  //login valid!!
  const onInvalid = () => {
    console.log('cant login account');
  };
  console.log('errors = ', errors.email?.message);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register('email', {
              required: 'This is required',
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com%/,
            })}
            name="email"
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === 'pattern'}
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
