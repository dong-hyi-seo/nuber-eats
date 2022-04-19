import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/from-error';
import { gql, useMutation } from '@apollo/client';
import nuberLog from '../images/log.svg';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * 항상 화면을 작성할때 모바일부터 생각하고 그다음 패드 그다음 데스크탑순으로 작성!
 */
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;
interface ILoginForm {
  email: string;
  password: string;
}
export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<ILoginForm>({
    mode: 'onChange', //canClick = react-hook-form library의 formState.isValid 값임. 해당 부분은 input tag에 모두 입력해도 true로 오지않는다.
    //별도설정을 해줘야함
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log('token = ', token);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      //loading 중일때는 back-end에 submit 보내기가 싫다!
      const { email, password } = getValues();
      console.log(getValues());
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-md flex flex-col px-5 items-center">
        <img src={nuberLog} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5">
          <input
            {...register('email', { required: 'Email is required' })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            name="password"
            required
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={'Log In'}
          />

          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{' '}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
