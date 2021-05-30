import { useForm } from 'react-hook-form';

import InputMask from '@/shared/presentation/components/inputs/Mask';
import Select from '@/shared/presentation/components/inputs/Select';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import { ICreateActivityUsecaseArgs } from '@/modules/activities/domain/usecases/ICreateActivity.usecase';
import activityValidator from '../../validators/activity.validator';
import { useCreateActivity } from '../../hooks/useCreateActivity';

const TYPES = [
  {
    value: 'bike',
    label: 'Bicicleta',
  },
  {
    value: 'run',
    label: 'Corrida',
  },
  {
    value: 'swimming',
    label: 'Natação',
  },
];

const FormCreateActivity = (): JSX.Element => {
  const { isLoading, create } = useCreateActivity();
  const resolver = useYupValidationResolver<ICreateActivityUsecaseArgs>(
    activityValidator,
  );
  const {
    handleSubmit,
    register,
    control,
    errors,
  } = useForm<ICreateActivityUsecaseArgs>({ resolver });

  return (
    <form onSubmit={handleSubmit(create)} className="w-full sm:max-w-2xl p-4">
      <fieldset className="border-2 px-4 pt-4 pb-2 border-gray-600 rounded sm:flex flex-row gap-3">
        <legend className="text-gray-400">Nova atividade</legend>

        <Select
          name="type"
          options={TYPES}
          register={register}
          error={errors.type?.message}
        />
        <InputMask
          name="time"
          placeholder="Tempo"
          mask="99:99"
          control={control}
          error={errors.time?.message}
        />
        <InputMask
          name="date"
          placeholder="Data"
          mask="99/99/9999"
          control={control}
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
