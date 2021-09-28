import { ReactNode, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

type WithAxiosProps = {
  children: ReactNode;
};

export const WithAxios: React.FC<WithAxiosProps> = ({ children }) => {
  const { signed, signOut } = useAuth();

  useMemo(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          response: { status },
        } = error;

        if (signed && status === 401) {
          signOut();
        }

        return Promise.reject(error);
      },
    );
  }, [signOut, signed]);

  return <>{children}</>;
};
