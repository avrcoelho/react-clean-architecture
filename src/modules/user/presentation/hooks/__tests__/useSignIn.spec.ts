import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { left, right } from '@/shared/core/Either';
import { useSignIn } from '../useSignIn';
import SignInBuilder from '../../../__tests__/builders/SignIn.builder';
import ISignInModel from '../../../domain/models/ISignIn.model';
import { signInUsecase } from '../../../usecases';
import { ISignInArgs } from '../../../domain/usecases/ISignIn.usecase';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const spyOnSignInService = jest.spyOn(signInUsecase, 'execute');

describe('SignIn hook', () => {
  it('should be able to have success signip', async () => {
    spyOnSignInService.mockImplementation(async () =>
      right({} as ISignInModel),
    );
    const signInData: ISignInArgs = SignInBuilder.aSignInData().build();
    const { result, waitForNextUpdate } = renderHook(() => useSignIn());

    act(() => {
      result.current.signIn(signInData);
    });
    await waitForNextUpdate();

    expect(mockHistoryPush).toHaveBeenCalled();
  });

  it('should be able to have error signip', async () => {
    spyOnSignInService.mockImplementation(async () => left('has error'));
    const spyToastError = jest.spyOn(toast, 'error');
    const signInData: ISignInArgs = SignInBuilder.aSignInData().build();
    const { result, waitForNextUpdate } = renderHook(() => useSignIn());

    act(() => {
      result.current.signIn(signInData);
    });
    await waitForNextUpdate();

    expect(spyToastError).toHaveBeenCalled();
  });
});
