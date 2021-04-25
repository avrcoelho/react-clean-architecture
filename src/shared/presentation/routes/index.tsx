import { Switch, BrowserRouter } from 'react-router-dom';

import SignIn from '@/modules/user/presentation/pages/SignIn';
import SignUp from '@/modules/user/presentation/pages/SignUp';

import Route from './Route';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
