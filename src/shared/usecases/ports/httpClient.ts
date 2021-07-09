export type HttpRequest = {
  url: string;
  data?: any;
  params?: any;
  headers?: any;
};

export type HttpResponse<Data = any> = {
  status: number;
  data: Data;
};

export interface HttpClient {
  get: <Data = any>(data: HttpRequest) => Promise<HttpResponse<Data>>;
  post: <Data = any>(data: HttpRequest) => Promise<HttpResponse<Data>>;
  delete: <Data = any>(data: HttpRequest) => Promise<HttpResponse<Data>>;
}
