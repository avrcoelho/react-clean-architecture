import { useForm } from 'react-hook-form';

import InputText from '@/shared/presentation/components/inputs/Text';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import signInValidator from '../../validators/signin.validator';

const SignIn = (): JSX.Element => {
  const resolver = useYupValidationResolver(signInValidator);
  const { handleSubmit, register, errors } = useForm({ resolver });

  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(data => console.log(data))}
        className="w-full max-w-sm border-2 p-4 border-gray-600 rounded"
      >
        <h1 className="text-gray-400 mb-4">Acessar conta</h1>
        <InputText
          name="email"
          placeholder="E-mail"
          register={register}
          error={errors.email}
        />
        <InputText
          name="password"
          placeholder="Senha"
          register={register}
          error={errors.password}
        />
        <ButtonDefault type="submit">Acessar</ButtonDefault>
      </form>
    </main>
  );
};

export default SignIn;