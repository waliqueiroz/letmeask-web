import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { Login } from './pages/Login';

const App: React.FC = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  </AuthContextProvider>
);

export default App;
