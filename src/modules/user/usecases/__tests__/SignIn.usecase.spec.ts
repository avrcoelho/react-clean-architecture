import { rest } from 'msw';
import { setupServer } from 'msw/node';

import CacheModel from '@/shared/usecases/ports/cache';
import HttpClient from '@/shared/infra/http/httpClient/Axios';
import Cache from '@/shared/infra/cache/LocalStorage';
import SignInBuilder from '../../__tests__/builders/SignIn.builder';
import SignInUsecase from '../SignIn.usecase';
import { ISignInArgs } from '../../domain/usecases/ISignIn.usecase';

const BASE_URL = process.env.REACT_APP_API;
const signInResponse = {
  token: 'ijosjioads',
  id: '123',
  fullname: 'John Doe',
};
const server = setupServer(
  rest.post(`${BASE_URL}/auth/login`, (req, res, ctx) => {
    return res(ctx.json(signInResponse));
  }),
);
let httpClient: HttpClient;
let cache: CacheModel;
let signInService: SignInUsecase;

describe('SignIn usecase', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    cache = new Cache();
    signInService = new SignInUsecase(httpClient, cache);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to auth have success', async () => {
    const signInData: ISignInArgs = SignInBuilder.aSignInData().build();
    const responseSignIn = await signInService.execute(signInData);

    expect(responseSignIn.value).toEqual(signInResponse);
  });

  it('should be able to return error', async () => {
    server.use(
      rest.post(`${BASE_URL}/auth/login`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Internal server error',
          }),
        );
      }),
    );
    const signInData: ISignInArgs = SignInBuilder.aSignInData().build();
    const responseSignIn = await signInService.execute(signInData);

    expect(responseSignIn.isLeft()).toBe(true);
  });
});
