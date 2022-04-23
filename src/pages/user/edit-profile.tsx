import React from 'react';
import { useMe } from '../../hooks/useMe';
import { Button } from '../../components/button';
import { useForm } from 'react-hook-form';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';
import { Helmet } from 'react-helmet';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;
interface IFormProps {
  email?: string;
  password?: string;
}
export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { error, ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData; //get cache email
      const { email: newEmail } = getValues(); //new email
      if (prevEmail !== newEmail) {
        //만약 email을 변경하려고 하면 cache 저장된 값 email 변경해준다!
        //writeFragment 사용 말고도 useMe (useQuery) 는 refetch function값도 주는데 이는 backend에 다시 한번 자동으로 요청하게해주어 cache를 업데이트해준다.
        //backend 부하가 없다면 refetch도 사용할만함
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment VerifiedUser on User {
              verified
              email
            }
          `,
          data: {
            email: newEmail,
            verified: false,
          },
        });
      }

      //cache email and change email check (verified is false)
      //update the cache
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }), //password가 공백일경우 password값을 아에안보냄
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Profile | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: 'Email is required',
          })}
          name="email"
          className="input"
          type=" email"
          placeholder="Email"
        />
        <input
          {...register('password', {
            required: 'Password is required',
          })}
          name="password"
          className="input"
          type="password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Profile"
        />
      </form>
    </div>
  );
};
