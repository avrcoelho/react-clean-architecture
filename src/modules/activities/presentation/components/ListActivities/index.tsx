import IActivityModel from '@/modules/activities/domain/models/IActivity.model';

interface ListActivitiesProps {
  activities: IActivityModel[];
}

const ListActivities = ({ activities }: ListActivitiesProps) => {
  return <section className="w-full sm:max-w-2xl p-4" />;
};

export default ListActivities;
