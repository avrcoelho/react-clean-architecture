import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { HttpClient, HttpRequest } from '@/shared/usecases/ports/httpClient';

class AxiosHttpClient implements HttpClient {
  private readonly baseUrl: string | undefined;

  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({});
    this.baseUrl = process.env.REACT_APP_API;
  }

  public get<TResponse>({
    url,
    params = null,
    headers = null,
  }: HttpRequest): Promise<AxiosResponse<TResponse>> {
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
  }: HttpRequest): Promise<AxiosResponse<TResponse>> {
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
  }: HttpRequest): Promise<AxiosResponse<TResponse>> {
    return this.axiosInstance({
      method: 'DELETE',
      url: `${this.baseUrl}${url}`,
      params,
      headers,
    });
  }
}

export default AxiosHttpClient;
