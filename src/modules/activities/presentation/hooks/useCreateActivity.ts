import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { createActivityUsecase } from '../../usecases';
import { ICreateActivityUsecaseArgs } from '../../domain/usecases/ICreateActivity.usecase';

type CreateActivityHook = () => {
  create(data: ICreateActivityUsecaseArgs): Promise<void>;
  isLoading: boolean;
};

export const useCreateActivity: CreateActivityHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const create = useCallback(async (data: ICreateActivityUsecaseArgs) => {
    setIsLoading(true);

    const response = await createActivityUsecase.execute(data);
    if (response.isRight()) {
      toast.success('Atividade adicionada');
    } else {
      toast.error('Erro ao adicionar atividade');
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    create,
  };
};
