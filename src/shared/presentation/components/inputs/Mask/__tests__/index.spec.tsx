import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import InputMask from '..';

const componentProps = {
  mask: '999',
  name: 'name',
  placeholder: 'placeholder',
  error: '',
};

const Component = (props: typeof componentProps): JSX.Element => {
  const { control } = useForm();

  return <InputMask control={control} {...props} />;
};

describe('InputMask component', () => {
  it('should not be able without error', () => {
    render(<Component {...componentProps} />);

    expect(screen.queryByText('has error')).toBeFalsy();
  });

  it('should be able with error', () => {
    componentProps.error = 'has error';
    render(<Component {...componentProps} />);

    expect(screen.queryByText('has error')).toBeTruthy();
  });
});
