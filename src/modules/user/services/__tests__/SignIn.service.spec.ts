import { rest } from 'msw';
import { setupServer } from 'msw/node';

import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import ICacheModel from '@/shared/infra/cache/models/ICache.model';
import HttpClient from '@/shared/infra/http/httpClient';
import Cache from '@/shared/infra/cache';
import SignInBuilder from '../../__tests__/builders/SignIn.builder';
import SignInService from '../SignIn.service';
import ISignInDTO from '../../dtos/ISignIn.dto';

const BASE_URL = process.env.REACT_APP_API;
const server = setupServer(
  rest.post(`${BASE_URL}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'ijosjioads',
        id: '123',
        fullname: 'John Doe',
      }),
    );
  }),
);
let httpClient: IHttpClientModel;
let cache: ICacheModel;
let signInService: SignInService;

describe('SignIn service', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    cache = new Cache();
    signInService = new SignInService(httpClient, cache);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to auth have success', async () => {
    const signInData: ISignInDTO = SignInBuilder.aSignInData().build();
    const responseSignIn = await signInService.execute(signInData);

    expect(responseSignIn.value).toEqual({
      token: 'ijosjioads',
      id: '123',
      fullname: 'John Doe',
    });
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
    const signInData: ISignInDTO = SignInBuilder.aSignInData().build();
    const responseSignIn = await signInService.execute(signInData);

    expect(responseSignIn.isLeft()).toBe(true);
  });
});
