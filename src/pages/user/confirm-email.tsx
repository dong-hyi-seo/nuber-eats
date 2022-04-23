import React, { useEffect } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';
import { useMe } from '../../hooks/useMe';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const VERIFY_EMAIL_MYTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const navigate = useNavigate();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData?.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      navigate('/', { replace: true });
    }
  };
  const [verifyEmail, { loading: verifyingEmail }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MYTATION, {
    onCompleted,
  });
  //useEffect : 리액트 컴포넌트가 랜더ㅣㅇ 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  //해당 hook 두번째 인자값 deps (배열)에는 컴포넌트가 화면에 가장 처음 렌더링 될때 한번만 실행하고 싶을때 넣는다.
  useEffect(() => {
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Nuber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-=-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm ">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
