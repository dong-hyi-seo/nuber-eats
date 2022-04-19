import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
const ClientRoutes = [<Route path="/restaurants" element={<Restaurants />} />];
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
  console.log('data.me.role', data.me.role);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading ...</span>
        {/*  tracking-wide는 글자사이의 간격을 좀 벌려줌*/}
      </div>
    );
  }
  //routes 는 route밖에 87못가짐
  return (
    <Router>
      <Routes>
        {data.me.role === 'Client' && ClientRoutes}
        <Navigate to="/" />
      </Routes>
    </Router>
  );
};
