import { Either } from '@/shared/core/Either';
import IActivityModel from '../models/IActivity.model';

export interface IGetUserActivitiesUsecase {
  execute: () => Promise<Either<any, IActivityModel[]>>;
}
