import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { App } from '../app';
import { LoggedOutRouter } from '../../routers/logged-out-router';
import { LoggedInRouter } from '../../routers/logged-in-router';
import { isLoggedInVar } from '../../apollo';

jest.mock('../../routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});

jest.mock('../../routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe('<App />', () => {
  it('renders LoggedOutRouter', () => {
    const { debug, getByText } = render(<App />);
    getByText('logged-out'); //위 mock test logged-out값을 못찾으면 테스트 실패
  });
  it('renders LoggedInRouter', async () => {
    const { debug, getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText('logged-in');
  });
});
