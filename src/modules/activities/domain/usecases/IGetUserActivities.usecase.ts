import IActivityModel from '../models/IActivity.model';

export interface IGetUserActivitiesUsecase {
  execute: (user_id: string) => Promise<IActivityModel[]>;
}
