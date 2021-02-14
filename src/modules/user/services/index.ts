import HttpClient from '@/shared/infra/http/httpClient';
import Cache from '@/shared/infra/cache';
import SignInService from './SignIn.service';

const httpClient = new HttpClient();
const cache = new Cache();
const signInService = new SignInService(httpClient, cache);

export { signInService };
