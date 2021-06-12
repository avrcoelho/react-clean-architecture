import combineContexts from './combineContexts';
import { GetActivitiesProvider } from './hooks/useGetActivities';

const providers = [GetActivitiesProvider];
const ActivitiesContextProvider = combineContexts(...providers);

export default ActivitiesContextProvider;
