import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import { left, right, Either } from '@/shared/core/Either';
import IUserModel from '../domain/models/IUser.model';
import { ISignUpUsecase, IUserArgs } from '../domain/usecases/ISignUp.usecase';

class SignUpUsecase implements ISignUpUsecase {
  constructor(private readonly httpClient: IHttpClientModel) {}

  async execute(userData: IUserArgs): Promise<Either<any, IUserModel>> {
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

export default SignUpUsecase;
