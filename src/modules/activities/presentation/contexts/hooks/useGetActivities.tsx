import {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import { getUserActivitiesUsecase } from '@/modules/activities/usecases';

interface GetActivitiesContextData {
  activities: IActivityModel[];
  removeActivity(id: string): void;
  addActivity(activity: IActivityModel): void;
}

const GetActivitiesContext = createContext<GetActivitiesContextData>(
  {} as GetActivitiesContextData,
);

export const CreatePropertyProvider: FC = ({ children }) => {
  const [activities, setActivities] = useState<IActivityModel[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getUserActivitiesUsecase.execute();
      if (response.isRight()) {
        setActivities(response.value);
      } else {
        toast.error('Erro ao obter as atividades');
      }
    })();
  }, []);

  const removeActivity = useCallback((activityId: string) => {
    setActivities(prevState =>
      prevState.filter(activity => activity.id !== activityId),
    );
  }, []);

  const addActivity = useCallback((activity: IActivityModel) => {
    setActivities(prevState => [activity, ...prevState]);
  }, []);

  return (
    <GetActivitiesContext.Provider
      value={{ activities, addActivity, removeActivity }}
    >
      {children}
    </GetActivitiesContext.Provider>
  );
};

export const useCreateProperty = (): GetActivitiesContextData =>
  useContext(GetActivitiesContext);
