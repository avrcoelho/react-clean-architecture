import { Either, left, right } from '@/shared/core/Either';
import IHttpClientModel from '@/shared/infra/http/httpClient/models/IHttpClient.model';
import IActivityModel from '../domain/models/IActivity.model';
import { IDeleteActivityUsecase } from '../domain/usecases/IDeleteActivity.usecase';

class DeleteActivityUsecase implements IDeleteActivityUsecase {
  constructor(private readonly htttpClient: IHttpClientModel) {}

  async execute(id: string): Promise<Either<any, true>> {
    try {
      await this.htttpClient.delete<IActivityModel[]>({
        url: `/activities/${id}`,
      });

      return right(true);
    } catch (error) {
      return left(error);
    }
  }
}

export default DeleteActivityUsecase;
