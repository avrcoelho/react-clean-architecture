import { rest } from 'msw';
import { setupServer } from 'msw/node';

import AxiosHttpClient from '..';

let axiosHttpClient: AxiosHttpClient;

const BASE_URL = process.env.REACT_APP_API;

const server = setupServer(
  rest.get(`${BASE_URL}/`, (req, res, ctx) => {
    return res(ctx.json(['a', 'b', 'c']));
  }),
  rest.post(`${BASE_URL}/`, (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
  rest.delete(`${BASE_URL}/`, (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),
);

describe('axios-http-client', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    axiosHttpClient = new AxiosHttpClient();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return data on method GET', async () => {
    const { data } = await axiosHttpClient.get({ url: '/' });

    expect(data).toEqual(['a', 'b', 'c']);
  });

  it('should be able to return data on method POST', async () => {
    const { data } = await axiosHttpClient.post({ url: '/' });

    expect(data).toEqual({ success: true });
  });

  it('should be able to DELETE', async () => {
    const { data } = await axiosHttpClient.delete({ url: '/' });

    expect(data).toEqual({ success: true });
  });
});
