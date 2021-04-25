import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import InputText from '@/shared/presentation/components/inputs/Text';
import { useYupValidationResolver } from '@/shared/presentation/hooks/useYupValidationResolver';
import ButtonDefault from '@/shared/presentation/components/Buttons/Default';
import signupValidator from '../../validators/signup.validator';
import { useSignUp } from '../../hooks/useSignUp';
import { ISignUpArgs } from '../../../domain/usecases/ISignUp.usecase';

const SignUp = (): JSX.Element => {
  const resolver = useYupValidationResolver<ISignUpArgs>(signupValidator);
  const { handleSubmit, register, errors, setError } = useForm<ISignUpArgs>({
    resolver,
  });
  const { signUp, isLoading } = useSignUp({ setError });

  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(signUp)}
        className="w-full max-w-sm border-2 p-4 border-gray-600 rounded"
      >
        <h1 className="text-gray-400 mb-4">Acessar conta</h1>
        <InputText
          name="fullname"
          placeholder="Nome completo"
          register={register}
          error={errors.fullname?.message}
        />
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
        <InputText
          name="password_confirmation"
          placeholder="Confirmar senha"
          register={register}
          error={errors.password_confirmation?.message}
        />
        <ButtonDefault type="submit" disabled={isLoading}>
          {isLoading ? 'Aguarde...' : 'Criar'}
        </ButtonDefault>
      </form>

      <Link to="/" className="text-purple-800 hover:underline mt-4">
        Acessar conta
      </Link>
    </main>
  );
};

export default SignUp;
