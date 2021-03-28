import { rest } from 'msw';
import { setupServer } from 'msw/node';

import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import HttpClient from '@/shared/infra/http/httpClient';
import UserBuilder from '../../__tests__/builders/User.builder';
import SignUpService from '../SignUp.service';
import IUserDTO from '../../dtos/IUser.dto';

const BASE_URL = process.env.REACT_APP_API;
const userResponse = {
  fullname: 'John Doe',
  email: 'jonhdoe@test.com',
  created_at: '2021-02-28T15:09:44.583Z',
  updated_at: '2021-02-28T15:09:44.583Z',
};
const server = setupServer(
  rest.post(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);
let httpClient: IHttpClientModel;
let signUpService: SignUpService;

describe('SignUp service', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    signUpService = new SignUpService(httpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to create user', async () => {
    const signInData: IUserDTO = UserBuilder.aUser().build();
    const responseSignUp = await signUpService.execute(signInData);

    expect(responseSignUp.value).toEqual(userResponse);
  });

  it('should be able to return error', async () => {
    server.use(
      rest.post(`${BASE_URL}/users`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Internal server error',
          }),
        );
      }),
    );
    const signInData: IUserDTO = UserBuilder.aUser().build();
    const responseSignUp = await signUpService.execute(signInData);

    expect(responseSignUp.isLeft()).toBe(true);
  });
});
