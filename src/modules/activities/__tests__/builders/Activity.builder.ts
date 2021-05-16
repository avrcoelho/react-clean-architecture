import { ICreateActivityUsecaseArgs } from '../../domain/usecases/ICreateActivity.usecase';

class ActivityBuilder {
  private readonly signInData: ICreateActivityUsecaseArgs = {
    user_id: '1234567',
    time: '15:00',
    type: 'bike',
    date: new Date(),
  };

  public static aActivityData(): ActivityBuilder {
    return new ActivityBuilder();
  }

  public build(): ICreateActivityUsecaseArgs {
    return this.signInData;
  }
}

export default ActivityBuilder;
