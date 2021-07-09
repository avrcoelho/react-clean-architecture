import { HttpClient } from '@/shared/usecases/ports/httpClient';
import Cache from '@/shared/usecases/ports/cache';
import { left, right, Either } from '@/shared/core/Either';
import CacheKeys from '@/shared/presentation/constants/cacheKeys';
import ISignInModel from '../domain/models/ISignIn.model';
import {
  ISignInArgs,
  ISignInUsecase,
} from '../domain/usecases/ISignIn.usecase';

class SignInUsecase implements ISignInUsecase {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cache: Cache,
  ) {}

  async execute(signInData: ISignInArgs): Promise<Either<any, ISignInModel>> {
    try {
      const { data } = await this.httpClient.post<ISignInModel>({
        url: '/auth/login',
        data: signInData,
      });

      const parsedSignInResponse = JSON.stringify(data);

      this.cache.save(CacheKeys.UserData, parsedSignInResponse);

      return right(data);
    } catch (error) {
      return left(error);
    }
  }
}

export default SignInUsecase;
