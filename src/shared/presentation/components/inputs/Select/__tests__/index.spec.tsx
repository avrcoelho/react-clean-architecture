import { render, screen } from '@testing-library/react';

import Select from '..';

describe('Select component', () => {
  const props = {
    register: jest.fn(),
    options: [
      {
        value: '2',
        label: 'Text',
      },
    ],
    error: '',
  };

  it('should not be able without error', () => {
    render(<Select {...props} />);

    expect(screen.queryByText('has error')).toBeFalsy();
  });

  it('should be able with error', () => {
    props.error = 'has error';
    render(<Select {...props} />);

    expect(screen.queryByText('has error')).toBeTruthy();
  });
});
