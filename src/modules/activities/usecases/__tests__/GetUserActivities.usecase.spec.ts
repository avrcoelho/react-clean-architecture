import { rest } from 'msw';
import { setupServer } from 'msw/node';

import HttpClient from '@/shared/infra/http/httpClient/implementation/Axios';
import GetUserActivitiesUsecase from '../GetUserActivities.usecase';
import ActivityBuilder from '../../__tests__/builders/Activity.builder';

const BASE_URL = process.env.REACT_APP_API;
const activity = ActivityBuilder.aActivityData().build();
const activityResponse = [
  {
    id: '123',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...activity,
  },
];
const server = setupServer(
  rest.get(`${BASE_URL}/activities`, (req, res, ctx) => {
    return res(ctx.json(activityResponse));
  }),
);

let httpClient: HttpClient;
let getUserActivitiesUsecase: GetUserActivitiesUsecase;

describe('GetUserActivities usecase', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    getUserActivitiesUsecase = new GetUserActivitiesUsecase(httpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to activities been getted', async () => {
    const response = await getUserActivitiesUsecase.execute();

    expect(response.isRight()).toBe(true);
  });

  it('should be able to return error', async () => {
    server.use(
      rest.get(`${BASE_URL}/activities`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Internal server error',
          }),
        );
      }),
    );
    const response = await getUserActivitiesUsecase.execute();

    expect(response.isLeft()).toBe(true);
  });
});
