import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { ErrorOption } from 'react-hook-form';

import { signUpUsecase } from '../../usecases';
import { IUserArgs } from '../../domain/usecases/ISignUp.usecase';

type Args = {
  setError: (name: string, error: ErrorOption) => void;
};

type UseSignUpHook = (
  args: Args,
) => {
  signUp(data: IUserArgs): Promise<void>;
  isLoading: boolean;
};

export const useSignUp: UseSignUpHook = ({ setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const verifyErrorType = useCallback(
    (error: any) => {
      if (error?.response?.status === 409) {
        setError('email', {
          type: 'validate',
          message: 'E-mail já cadastrado',
        });
      } else {
        toast.error('Erro ao realizar o cadastro. Tente novamente mais tarde');
      }
    },
    [setError],
  );

  const signUp = useCallback(
    async (data: IUserArgs) => {
      setIsLoading(true);

      const response = await signUpUsecase.execute(data);
      if (response.isRight()) {
        toast.success('Cadastro realizado com sucesso');
        history.push('/');
      } else {
        verifyErrorType(response.value);
      }

      setIsLoading(false);
    },
    [history, verifyErrorType],
  );

  return {
    isLoading,
    signUp,
  };
};
