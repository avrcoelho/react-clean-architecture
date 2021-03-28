import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import { left, right, Either } from '@/shared/core/Either';
import IUserDTO from '../dtos/IUser.dto';
import IUserModel from '../models/IUser.model';

class SignUpService {
  constructor(private readonly httpClient: IHttpClientModel) {}

  async execute(userData: IUserDTO): Promise<Either<any, IUserModel>> {
    try {
      const { data } = await this.httpClient.post<IUserModel>({
        url: '/users',
        data: userData,
      });

      return right(data);
    } catch (error) {
      return left(error);
    }
  }
}

export default SignUpService;
