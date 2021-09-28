import { Switch } from 'react-router-dom';

import Route from './Route';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';
import { AdminRoom } from '../pages/AdminRoom';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route useAuthLayout path="/" exact component={Home} />
      <Route useAuthLayout path="/login" component={Login} />
      <Route useAuthLayout path="/sign-up" component={SignUp} />
      <Route isPrivate useAuthLayout path="/rooms/new" component={NewRoom} />
      <Route path="/rooms/:id" component={Room} />
      <Route isPrivate path="/admin/rooms/:id" component={AdminRoom} />
    </Switch>
  );
};

export default Routes;
