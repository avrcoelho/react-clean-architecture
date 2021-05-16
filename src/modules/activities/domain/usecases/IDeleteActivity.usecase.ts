import { Either } from '@/shared/core/Either';

export interface IDeleteActivityUsecase {
  execute: (id: string) => Promise<Either<any, true>>;
}
