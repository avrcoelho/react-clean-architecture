import { Either, left, right } from '@/shared/core/Either';
import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import IActivityModel from '../domain/models/IActivity.model';
import {
  ICreateActivityUsecase,
  ICreateActivityUsecaseArgs,
} from '../domain/usecases/ICreateActivity.usecase';

class CreateActivityUsecase implements ICreateActivityUsecase {
  constructor(private readonly htttpClient: IHttpClientModel) {}

  async execute(
    args: ICreateActivityUsecaseArgs,
  ): Promise<Either<any, IActivityModel>> {
    try {
      const { data } = await this.htttpClient.post<IActivityModel>({
        url: '/activities',
        data: args,
      });

      return right(data);
    } catch (error) {
      return left(error);
    }
  }
}

export default CreateActivityUsecase;
