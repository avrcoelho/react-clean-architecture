import { Switch, BrowserRouter } from 'react-router-dom';

import SignIn from '@/modules/user/presentation/pages/SignIn';

import Route from './Route';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
