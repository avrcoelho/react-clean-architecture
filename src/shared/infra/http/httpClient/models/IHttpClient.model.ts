import { AxiosResponse } from 'axios';

import { IApiDeleteDTO, IApiGetDTO, IApiPostDTO } from '../dtos/IApi.dto';

export default interface IHttpClientModel {
  get: <TResponse>(data: IApiGetDTO) => Promise<AxiosResponse<TResponse>>;
  post: <TResponse>(data: IApiPostDTO) => Promise<AxiosResponse<TResponse>>;
  delete: <TResponse>(data: IApiDeleteDTO) => Promise<AxiosResponse<TResponse>>;
}
