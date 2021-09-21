import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

const App: React.FC = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Routes />
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  </AuthContextProvider>
);

export default App;
