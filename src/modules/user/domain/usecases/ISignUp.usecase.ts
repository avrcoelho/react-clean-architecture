import { Either } from '@/shared/core/Either';
import IUserModel from '../models/IUser.model';

export interface IUserArgs {
  fullname: string;
  email: string;
  password: string;
}

export interface ISignUpUsecase {
  execute: (args: IUserArgs) => Promise<Either<any, IUserModel>>;
}
