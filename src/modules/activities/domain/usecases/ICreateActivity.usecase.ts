import IActivityModel from '../models/IActivity.model';

type IcreateActivityUsecaseArgs = Omit<
  IActivityModel,
  'id' | 'created_at' | 'updated_at'
>;

export interface IcreateActivityUsecase {
  execute: (args: IcreateActivityUsecaseArgs) => Promise<IActivityModel>;
}
