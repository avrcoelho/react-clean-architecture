/* eslint-disable camelcase */
import { Either } from '@/shared/core/Either';
import IUserModel from '../models/IUser.model';

export interface ISignUpArgs {
  fullname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ISignUpUsecase {
  execute: (args: ISignUpArgs) => Promise<Either<any, IUserModel>>;
}
