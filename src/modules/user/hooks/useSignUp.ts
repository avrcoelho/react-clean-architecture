import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import IUserDTO from '../dtos/IUser.dto';
import { signUpService } from '../services';

type useSignUpHook = () => {
  signUp(data: IUserDTO): Promise<void>;
  isLoading: boolean;
};

export const useSignUp: useSignUpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const signUp = useCallback(
    async (data: IUserDTO) => {
      setIsLoading(true);

      const response = await signUpService.execute(data);
      if (response.isRight()) {
        toast.error('Cadastro realizado com sucesso');
        history.push('/dashboard');
      } else {
        toast.error('Erro ao realizar o cadastro. Tente novamente mais tarde');
      }

      setIsLoading(false);
    },
    [history],
  );

  return {
    isLoading,
    signUp,
  };
};
