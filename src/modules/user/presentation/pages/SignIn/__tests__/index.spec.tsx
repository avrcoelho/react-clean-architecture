import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';

import SignIn from '..';

const mockedIsLoading = jest.fn();
const mockedSignIn = jest.fn();
jest.mock('../../../hooks/useSignIn', () => ({
  useSignIn: () => ({
    isLoading: mockedIsLoading(),
    signIn: mockedSignIn,
  }),
}));

describe('SignIn Page', () => {
  it('should be able to show field errors', async () => {
    mockedIsLoading.mockReturnValueOnce(false);
    render(<SignIn />);
    const submitButton = screen.getByText('Acessar');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Campo obrigatório')).toHaveLength(2);
    });
  });

  it('should be able to render loading text in button', async () => {
    render(<SignIn />);
    const submitButton = screen.getByText('Acessar');

    act(() => {
      fireEvent.click(submitButton);
      mockedIsLoading.mockReturnValueOnce(true);
    });

    await waitFor(() => {
      expect(screen.getByText('Aguarde...')).toBeTruthy();
    });
  });

  it('should be able to disabled button', () => {
    mockedIsLoading.mockReturnValueOnce(true);
    render(<SignIn />);
    const submitButton = screen.getByText('Aguarde...');

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should be able to call signIn function', async () => {
    render(<SignIn />);
    const submitButton = screen.getByText('Acessar');
    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Senha');

    act(() => {
      fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalled();
    });
  });
});
