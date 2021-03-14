import { render, screen } from '@testing-library/react';

import InputText from '..';

describe('InputText component', () => {
  const props = {
    register: jest.fn(),
    error: '',
  };

  it('should not be able without error', () => {
    render(<InputText {...props} />);

    expect(screen.queryByText('has error')).toBeFalsy();
  });

  it('should be able with error', () => {
    props.error = 'has error';
    render(<InputText {...props} />);

    expect(screen.queryByText('has error')).toBeTruthy();
  });
});
