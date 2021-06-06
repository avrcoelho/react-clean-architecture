import IActivityModel from '../../../domain/models/IActivity.model';
import FormCreateActivity from '../../components/FormCreateActivity';
import ListActivities from '../../components/ListActivities';

const props = {
  activities: [
    {
      id: '123',
      user_id: '123',
      time: '02:00',
      type: 'run',
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '123',
      user_id: '123',
      time: '02:00',
      type: 'run',
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ] as IActivityModel[],
};

const Dashboard = (): JSX.Element => {
  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl text-gray-400 mb-4">Atividades</h1>
      <FormCreateActivity />

      <ListActivities {...props} />
    </main>
  );
};

export default Dashboard;
