import httpClient from '@/shared/infra/http/httpClient';
import CreateActivityUsecase from './CreateActivity.usecase';
import GetUserActivitiesUsecase from './GetUserActivities.usecase';
import DeleteActivityUsecase from './DeleteActivity.usecase';

const createActivityUsecase = new CreateActivityUsecase(httpClient);
const getUserActivitiesUsecase = new GetUserActivitiesUsecase(httpClient);
const deleteActivityUsecase = new DeleteActivityUsecase(httpClient);

export {
  createActivityUsecase,
  getUserActivitiesUsecase,
  deleteActivityUsecase,
};
