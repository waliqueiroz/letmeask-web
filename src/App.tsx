import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Routes />
      <ToastContainer autoClose={3000} />
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
