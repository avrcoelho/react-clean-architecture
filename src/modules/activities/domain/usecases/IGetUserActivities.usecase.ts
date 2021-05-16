import { Either } from '@/shared/core/Either';
import IActivityModel from '../models/IActivity.model';

export interface IGetUserActivitiesUsecase {
  execute: (user_id: string) => Promise<Either<any, IActivityModel[]>>;
}
