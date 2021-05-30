import { render, screen } from '@testing-library/react';

import InputMask from '..';

describe('InputMask component', () => {
  const props = {
    register: jest.fn(),
    mask: '999',
    error: '',
  };

  it('should not be able without error', () => {
    render(<InputMask {...props} />);

    expect(screen.queryByText('has error')).toBeFalsy();
  });

  it('should be able with error', () => {
    props.error = 'has error';
    render(<InputMask {...props} />);

    expect(screen.queryByText('has error')).toBeTruthy();
  });
});
