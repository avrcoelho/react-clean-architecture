import { useCallback } from 'react';
import { toast } from 'react-toastify';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import { deleteActivityUsecase } from '@/modules/activities/usecases';
import { useGetActivities } from '../../contexts/hooks/useGetActivities';
import Item from './Item';

interface ListActivitiesProps {
  activities: IActivityModel[];
}

const ListActivities = ({ activities }: ListActivitiesProps) => {
  const { removeActivity } = useGetActivities();

  const handleDeleteActivity = useCallback(
    async (id: string) => {
      const response = await deleteActivityUsecase.execute(id);
      if (response.isRight()) {
        toast.success('Atividade excluída');
        removeActivity(id);
      } else {
        toast.error('Erro ao excluir atividade');
      }
    },
    [removeActivity],
  );

  return (
    <section className="w-full sm:max-w-2xl p-4">
      {activities.map(activity => (
        <Item
          key={activity.id}
          activity={activity}
          onDelete={handleDeleteActivity}
        />
      ))}
    </section>
  );
};

export default ListActivities;
