import { rest } from 'msw';
import { setupServer } from 'msw/node';

import HttpClient from '@/shared/infra/http/httpClient/implementation/Axios';
import DeleteActivityUsecase from '../DeleteActivity.usecase';

const BASE_URL = process.env.REACT_APP_API;
const server = setupServer(
  rest.delete(`${BASE_URL}/activities/:id`, (req, res, ctx) => {
    return res();
  }),
);

let httpClient: HttpClient;
let deleteActivityUsecase: DeleteActivityUsecase;

describe('DeleteActivity usecase', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    httpClient = new HttpClient();
    deleteActivityUsecase = new DeleteActivityUsecase(httpClient);
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to activity been deleted', async () => {
    const response = await deleteActivityUsecase.execute('123');

    expect(response.isRight()).toBe(true);
  });

  it('should be able to return error', async () => {
    server.use(
      rest.delete(`${BASE_URL}/activities/:id`, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: 'Internal server error',
          }),
        );
      }),
    );
    const response = await deleteActivityUsecase.execute('123');

    expect(response.isLeft()).toBe(true);
  });
});
