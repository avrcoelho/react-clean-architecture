import SignIn from '@/modules/user/pages/SignIn';
import ToastifyContainer from '../components/ToastifyContainer';

function App(): JSX.Element {
  return (
    <>
      <SignIn />
      <ToastifyContainer />
    </>
  );
}

export default App;
