import { useForm } from 'react-hook-form';

import InputText from '@/shared/presentation/components/inputs/Text';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import { ICreateActivityUsecaseArgs } from '@/modules/activities/domain/usecases/ICreateActivity.usecase';
import activityValidator from '../../validators/activity.validator';

const Dashboard = (): JSX.Element => {
  const resolver = useYupValidationResolver<ICreateActivityUsecaseArgs>(
    activityValidator,
  );
  const {
    handleSubmit,
    register,
    errors,
  } = useForm<ICreateActivityUsecaseArgs>({ resolver });

  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl text-gray-400 mb-4">Atividades</h1>

      <form className="max-w-2xl p-4">
        <fieldset className="border-2 p-4 border-gray-600 rounded flex flex-row gap-3">
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
          <ButtonDefault type="submit" className="px-4">
            Adicionar
          </ButtonDefault>
        </fieldset>
      </form>
    </main>
  );
};

export default Dashboard;
