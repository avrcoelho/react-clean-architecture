import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import InputText from '@/shared/presentation/components/inputs/Text';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import signInValidator from '../../validators/signin.validator';
import { useSignIn } from '../../hooks/useSignIn';
import { ISignInArgs } from '../../../domain/usecases/ISignIn.usecase';

const SignIn = (): JSX.Element => {
  const resolver = useYupValidationResolver<ISignInArgs>(signInValidator);
  const { signIn, isLoading } = useSignIn();
  const { handleSubmit, register, errors } = useForm<ISignInArgs>({ resolver });

  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(signIn)}
        className="w-full max-w-sm border-2 p-4 border-gray-600 rounded"
      >
        <h1 className="text-gray-400 mb-4">Acessar conta</h1>
        <InputText
          name="email"
          placeholder="E-mail"
          register={register}
          error={errors.email?.message}
        />
        <InputText
          name="password"
          placeholder="Senha"
          register={register}
          error={errors.password?.message}
        />
        <ButtonDefault type="submit" disabled={isLoading}>
          {isLoading ? 'Aguarde...' : 'Acessar'}
        </ButtonDefault>
      </form>

      <Link to="/signup" className="text-purple-800 hover:underline mt-4">
        Criar conta
      </Link>
    </main>
  );
};

export default SignIn;
