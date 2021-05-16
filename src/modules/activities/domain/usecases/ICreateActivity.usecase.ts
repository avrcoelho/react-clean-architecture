import { Either } from '@/shared/core/Either';
import IActivityModel from '../models/IActivity.model';

export type ICreateActivityUsecaseArgs = Omit<
  IActivityModel,
  'id' | 'created_at' | 'updated_at'
>;

export interface ICreateActivityUsecase {
  execute: (
    args: ICreateActivityUsecaseArgs,
  ) => Promise<Either<any, IActivityModel>>;
}
