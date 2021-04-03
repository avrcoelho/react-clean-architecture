import httpClient from '@/shared/infra/http/httpClient';
import cache from '@/shared/infra/cache';
import SignInUsecase from './SignIn.usecase';
import SignUpUsecase from './SignUp.usecase';

const signInUsecase = new SignInUsecase(httpClient, cache);
const signUpUsecase = new SignUpUsecase(httpClient);

export { signInUsecase, signUpUsecase };
