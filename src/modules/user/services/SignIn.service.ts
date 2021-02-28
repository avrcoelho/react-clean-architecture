import ICache from '@/shared/infra/cache/models/ICache.model';
import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import { left, right, Either } from '@/shared/core/Either';
import ISignInDTO from '../dtos/ISignIn.dto';
import ISignInModel from '../models/ISignIn.model';

class SignInService {
  constructor(
    private readonly httpClient: IHttpClientModel,
    private readonly cache: ICache,
  ) {}

  async execute(signInData: ISignInDTO): Promise<Either<string, ISignInModel>> {
    try {
      const { data } = await this.httpClient.post<ISignInModel>({
        url: '/auth/login',
        data: signInData,
      });

      const parsedSignInResponse = JSON.stringify(data);

      this.cache.save('@userData', parsedSignInResponse);

      return right(data);
    } catch (error) {
      return left(error);
    }
  }
}

export default SignInService;
