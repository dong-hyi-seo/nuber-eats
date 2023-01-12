import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../button';

describe('<Button />', () => {
  it('should render OK with props', () => {
    const { debug, getByText, rerender } = render(
      <Button canClick={true} loading={false} actionText={'test'} />,
    );
    getByText('test');
    debug();
    rerender(<Button canClick={true} loading={true} actionText={'test'} />);
    debug();
    getByText('Loading...');
  });
});
