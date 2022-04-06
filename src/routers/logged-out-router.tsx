import React from 'react';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter = () => {
  //apollo client local state update 방법은 reactive variables를 사용한다.
  const onClick = () => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
};
