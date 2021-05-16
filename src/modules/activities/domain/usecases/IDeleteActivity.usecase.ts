export interface IDeleteActivityUsecase {
  execute: (id: string) => Promise<void>;
}
