import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import IUserDTO from '../dtos/IUser.dto';
import IUserModel from '../models/IUser.model';

class CreateUserService {
  constructor(private readonly httpClient: IHttpClientModel) {}

  async execute(userData: IUserDTO): Promise<IUserModel> {
    const { data } = await this.httpClient.post<IUserModel>({
      url: '/users',
      data: userData,
    });

    return data;
  }
}

export default CreateUserService;
