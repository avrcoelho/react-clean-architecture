import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
  IHttpClientDeleteDTO,
  IHttpClientGetDTO,
  IHttpClientPostDTO,
} from '../dtos/IHttpClient.dto';
import IHttpClientModel from '../models/IHttpClient.model';

class AxiosHttpClient implements IHttpClientModel {
  private baseUrl: string | undefined;

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({});
    this.baseUrl = process.env.REACT_APP_API;
  }

  public get<TResponse>({
    url,
    params = null,
    headers = null,
  }: IHttpClientGetDTO): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance({
      method: 'GET',
      url: `${this.baseUrl}${url}`,
      params,
      headers,
    });
  }

  public post<TResponse>({
    url,
    params = null,
    data = null,
    headers = null,
  }: IHttpClientPostDTO): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance({
      method: 'POST',
      url: `${this.baseUrl}${url}`,
      params,
      data,
      headers,
    });
  }

  public delete<TResponse>({
    url,
    params = null,
    headers = null,
  }: IHttpClientDeleteDTO): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance({
      method: 'DELETE',
      url: `${this.baseUrl}${url}`,
      params,
      headers,
    });
  }
}

export default AxiosHttpClient;
