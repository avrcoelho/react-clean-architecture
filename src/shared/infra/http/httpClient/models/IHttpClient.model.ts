import { AxiosResponse } from 'axios';

import {
  IHttpClientDeleteDTO,
  IHttpClientGetDTO,
  IHttpClientPostDTO,
} from '../dtos/IHttpClient.dto';

export default interface IHttpClientModel {
  get: <TResponse>(
    data: IHttpClientGetDTO,
  ) => Promise<AxiosResponse<TResponse>>;
  post: <TResponse>(
    data: IHttpClientPostDTO,
  ) => Promise<AxiosResponse<TResponse>>;
  delete: <TResponse>(
    data: IHttpClientDeleteDTO,
  ) => Promise<AxiosResponse<TResponse>>;
}
