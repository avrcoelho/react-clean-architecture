import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import ISignInDTO from '../dtos/ISignIn.dto';
import { signInService } from '../services';

type SignInHook = () => {
  signIn(data: ISignInDTO): Promise<void>;
  isLoading: boolean;
};

export const useSignIn: SignInHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const signIn = useCallback(
    async (data: ISignInDTO) => {
      setIsLoading(true);

      const response = await signInService.execute(data);
      if (response.isRight()) {
        history.push('/dashboard');
      } else {
        toast.error('Erro ao acessar conta. Verifique seu e-mail/senha');
      }

      setIsLoading(false);
    },
    [history],
  );

  return {
    isLoading,
    signIn,
  };
};
