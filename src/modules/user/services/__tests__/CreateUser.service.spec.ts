import { rest } from 'msw';
import { setupServer } from 'msw/node';

import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import HttpClient from '@/shared/infra/http/httpClient';
import UserBuilder from '../../__tests__/builders/User.builder';
import CreateUserService from '../CreateUser.service';
import IUserDTO from '../../dtos/IUser.dto';

const BASE_URL = process.env.REACT_APP_API;
const server = setupServer(
  rest.post(`${BASE_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        fullname: 'John Doe',
        email: 'jonhdoe@test.com',
        created_at: '2021-02-28T15:09:44.583Z',
        updated_at: '2021-02-28T15:09:44.583Z',
      }),
    );
  }),
);
let httpClient: IHttpClientModel;
let createUserService: CreateUserService;

describe('CreateUser service', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    createUserService = new CreateUserService(httpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to create user', async () => {
    const signInData: IUserDTO = UserBuilder.aUser().build();
    const responseCreateUser = await createUserService.execute(signInData);

    expect(responseCreateUser.value).toEqual({
      fullname: 'John Doe',
      email: 'jonhdoe@test.com',
      created_at: '2021-02-28T15:09:44.583Z',
      updated_at: '2021-02-28T15:09:44.583Z',
    });
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
    const responseCreateUser = await createUserService.execute(signInData);

    expect(responseCreateUser.isLeft()).toBe(true);
  });
});
