import { useForm } from 'react-hook-form';

import InputText from '@/shared/presentation/components/inputs/Text';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import { ICreateActivityUsecaseArgs } from '@/modules/activities/domain/usecases/ICreateActivity.usecase';
import activityValidator from '../../validators/activity.validator';
import { useCreateActivity } from '../../hooks/useCreateActivity';

const FormCreateActivity = (): JSX.Element => {
  const { isLoading, create } = useCreateActivity();
  const resolver = useYupValidationResolver<ICreateActivityUsecaseArgs>(
    activityValidator,
  );
  const {
    handleSubmit,
    register,
    errors,
  } = useForm<ICreateActivityUsecaseArgs>({ resolver });

  return (
    <form onSubmit={handleSubmit(create)} className="w-full sm:max-w-2xl p-4">
      <fieldset className="border-2 px-4 pt-4 pb-2 border-gray-600 rounded sm:flex flex-row gap-3">
        <legend className="text-gray-400">Nova atividade</legend>

        <InputText
          name="type"
          placeholder="Tipo"
          register={register}
          error={errors.type?.message}
        />
        <InputText
          name="time"
          placeholder="Tempo"
          register={register}
          error={errors.time?.message}
        />
        <InputText
          name="date"
          placeholder="Data"
          register={register}
          error={errors.date?.message}
        />
        <ButtonDefault type="submit" className="px-4" disabled={isLoading}>
          {isLoading ? 'Aguarde...' : 'Adicionar'}
        </ButtonDefault>
      </fieldset>
    </form>
  );
};

export default FormCreateActivity;
