import React from 'react';
import { isLoggedInVar } from '../apollo';
import { gql, useQuery } from '@apollo/client';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(ME_QUERY);
  //header에 token 셋팅안해주면 error 남 (graphql 모든 request에 header에 담아줘야하니까 apollo.ts 에서 설정한다)
  console.log('error', error);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading ...</span>
        {/*  tracking-wide는 글자사이의 간격을 좀 벌려줌*/}
      </div>
    );
  }
  return (
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};
