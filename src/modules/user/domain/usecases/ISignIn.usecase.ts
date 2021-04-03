import { Either } from '@/shared/core/Either';
import ISignInModel from '../models/ISignIn.model';

export interface ISignInArgs {
  email: string;
  password: string;
}

export interface ISignInUsecase {
  execute: (args: ISignInArgs) => Promise<Either<any, ISignInModel>>;
}
