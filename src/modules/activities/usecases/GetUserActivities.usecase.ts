import { Either, left, right } from '@/shared/core/Either';
import { HttpClient } from '@/shared/usecases/ports/httpClient';
import IActivityModel from '../domain/models/IActivity.model';
import { IGetUserActivitiesUsecase } from '../domain/usecases/IGetUserActivities.usecase';

class GetUserActivitiesUsecase implements IGetUserActivitiesUsecase {
  constructor(private readonly htttpClient: HttpClient) {}

  async execute(): Promise<Either<any, IActivityModel[]>> {
    try {
      const { data } = await this.htttpClient.get<IActivityModel[]>({
        url: '/activities',
      });

      return right(data);
    } catch (error) {
      return left(error);
    }
  }
}

export default GetUserActivitiesUsecase;
