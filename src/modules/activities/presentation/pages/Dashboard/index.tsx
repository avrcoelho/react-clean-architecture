import FormCreateActivity from '../../components/FormCreateActivity';

const Dashboard = (): JSX.Element => {
  return (
    <main className="bg-gray-800 p-4 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl text-gray-400 mb-4">Atividades</h1>
      <FormCreateActivity />
    </main>
  );
};

export default Dashboard;
