import { rest } from 'msw';
import { setupServer } from 'msw/node';

import HttpClient from '@/shared/infra/http/httpClient/implementation/Axios';
import CreateActivityUsecase from '../CreateActivity.usecase';
import ActivityBuilder from '../../__tests__/builders/Activity.builder';

const BASE_URL = process.env.REACT_APP_API;
const activity = ActivityBuilder.aActivityData().build();
const activityResponse = {
  id: '123',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...activity,
};
const server = setupServer(
  rest.post(`${BASE_URL}/activities`, (req, res, ctx) => {
    return res(ctx.json(activityResponse));
  }),
);

let httpClient: HttpClient;
let createActivityUsecase: CreateActivityUsecase;

describe('CreateActivity usecase', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    createActivityUsecase = new CreateActivityUsecase(httpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to activity been created', async () => {
    const response = await createActivityUsecase.execute(activity);

    expect(response.isRight()).toBe(true);
  });

  it('should be able to return error', async () => {
    server.use(
      rest.post(`${BASE_URL}/activities`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Internal server error',
          }),
        );
      }),
    );
    const response = await createActivityUsecase.execute(activity);

    expect(response.isLeft()).toBe(true);
  });
});
