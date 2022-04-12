import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login';
import { CreateAccount } from '../pages/create-account';

//browser router example : google.com/hello
//hash router example : google.com/#hello
//강의에서 차이점 react-router-dom v6 부터 Switch component가 Routes로 변경됨
export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};
