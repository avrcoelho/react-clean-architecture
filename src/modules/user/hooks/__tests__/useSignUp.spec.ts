import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { left, right } from '@/shared/core/Either';
import { useSignUp } from '../useSignUp';
import SignUpBuilder from '../../__tests__/builders/User.builder';
import IUserDTO from '../../dtos/IUser.dto';
import IUserModel from '../../models/IUser.model';
import { signUpService } from '../../services';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const spyOnSignUpService = jest.spyOn(signUpService, 'execute');

describe('SignUp hook', () => {
  const mockSetError = jest.fn();
  const args = {
    setError: mockSetError,
  };
  it('should be able to have success signup', async () => {
    spyOnSignUpService.mockImplementation(async () => right({} as IUserModel));
    const signUpData: IUserDTO = SignUpBuilder.aUser().build();
    const { result, waitForNextUpdate } = renderHook(() => useSignUp(args));

    act(() => {
      result.current.signUp(signUpData);
    });
    await waitForNextUpdate();

    expect(mockHistoryPush).toHaveBeenCalled();
  });

  it('should be able to have any error signup', async () => {
    spyOnSignUpService.mockImplementation(async () => left('has error'));
    const spyToastError = jest.spyOn(toast, 'error');
    const signUpData: IUserDTO = SignUpBuilder.aUser().build();
    const { result, waitForNextUpdate } = renderHook(() => useSignUp(args));

    act(() => {
      result.current.signUp(signUpData);
    });
    await waitForNextUpdate();

    expect(spyToastError).toHaveBeenCalledWith(
      'Erro ao realizar o cadastro. Tente novamente mais tarde',
    );
  });

  it('should be able to return error when email address already registered ', async () => {
    spyOnSignUpService.mockImplementation(async () =>
      left({
        response: {
          status: 409,
        },
      }),
    );
    const signUpData: IUserDTO = SignUpBuilder.aUser().build();
    const { result, waitForNextUpdate } = renderHook(() => useSignUp(args));

    act(() => {
      result.current.signUp(signUpData);
    });
    await waitForNextUpdate();

    expect(mockSetError).toHaveBeenCalled();
  });
});
