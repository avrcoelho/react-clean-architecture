import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import Item from './Item';

interface ListActivitiesProps {
  activities: IActivityModel[];
}

const ListActivities = ({ activities }: ListActivitiesProps) => {
  return (
    <section className="w-full sm:max-w-2xl p-4">
      {activities.map(activity => (
        <Item key={activity.id} activity={activity} />
      ))}
    </section>
  );
};

export default ListActivities;
