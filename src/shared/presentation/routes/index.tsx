import { Switch, BrowserRouter } from 'react-router-dom';

import SignIn from '@/modules/user/presentation/pages/SignIn';
import SignUp from '@/modules/user/presentation/pages/SignUp';
import Dashboard from '@/modules/activities/presentation/pages/Dashboard';
import Route from './Route';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  </BrowserRouter>
);

export default Routes;
