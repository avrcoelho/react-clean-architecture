import { ReactNode } from 'react';
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';

import SignUp from '..';

const mockedIsLoading = jest.fn();
const mockedSignUp = jest.fn();
jest.mock('../../../hooks/useSignUp', () => ({
  useSignUp: () => ({
    isLoading: mockedIsLoading(),
    signUp: mockedSignUp,
  }),
}));
jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

describe('SignUp Page', () => {
  it('should be able to show field errors', async () => {
    mockedIsLoading.mockReturnValueOnce(false);
    render(<SignUp />);
    const submitButton = screen.getByText('Criar');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Campo obrigatório')).toHaveLength(4);
    });
  });

  it('should be able to render loading text in button', async () => {
    render(<SignUp />);
    const submitButton = screen.getByText('Criar');

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
    render(<SignUp />);
    const submitButton = screen.getByText('Aguarde...');

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should be able to call signUp function', async () => {
    render(<SignUp />);
    const submitButton = screen.getByText('Criar');
    const fullnameField = screen.getByPlaceholderText('Nome completo');
    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Senha');
    const passwordConfirmationField = screen.getByPlaceholderText(
      'Confirmar senha',
    );

    act(() => {
      fireEvent.change(fullnameField, { target: { value: 'John Doe' } });
      fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });
      fireEvent.change(passwordConfirmationField, {
        target: { value: '123456' },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedSignUp).toHaveBeenCalled();
    });
  });
});
