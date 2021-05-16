import { ICreateActivityUsecaseArgs } from '../../domain/usecases/ICreateActivity.usecase';

class ActivityBuilder {
  private readonly activityData: ICreateActivityUsecaseArgs = {
    user_id: '1234567',
    time: '15:00',
    type: 'bike',
    date: new Date(),
  };

  public static aActivityData(): ActivityBuilder {
    return new ActivityBuilder();
  }

  public build(): ICreateActivityUsecaseArgs {
    return this.activityData;
  }
}

export default ActivityBuilder;
