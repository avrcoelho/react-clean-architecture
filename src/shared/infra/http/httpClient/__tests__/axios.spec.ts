import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Axios from '../Axios';

let axios: Axios;

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

describe('Axios', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    axios = new Axios();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should be able to return data on method GET', async () => {
    const { data } = await axios.get({ url: '/' });

    expect(data).toEqual(['a', 'b', 'c']);
  });

  it('should be able to return data on method POST', async () => {
    const { data } = await axios.post({ url: '/' });

    expect(data).toEqual({ success: true });
  });

  it('should be able to DELETE', async () => {
    const { data } = await axios.delete({ url: '/' });

    expect(data).toEqual({ success: true });
  });
});
