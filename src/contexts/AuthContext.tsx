/* eslint-disable camelcase */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

type AuthContextProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type AuthContextData = {
  user: User | undefined;
  token: string;
  signed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const history = useHistory();

  const TOKEN_KEY = '@letmeask-token';
  const USER_KEY = '@letmeask-user';

  const [user, setUser] = useState<User>();
  const [signed, setSigned] = useState(false);
  const [token, setToken] = useState('');

  function setAuthState(authUser: User | undefined, currentToken: string) {
    setUser(authUser);
    setToken(currentToken);
    setSigned(authUser !== undefined);

    api.defaults.headers.Authorization = `Bearer ${currentToken}`;
  }

  useEffect(() => {
    const currentToken = window.localStorage.getItem(TOKEN_KEY);
    const userSerialized = window.localStorage.getItem(USER_KEY);

    if (userSerialized != null && currentToken != null) {
      const authUser = JSON.parse(userSerialized);
      setAuthState(authUser, currentToken);
    }
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post('login', {
      email,
      password,
    });

    const { user: authUser, access_token: AccessToken } = response.data;

    setAuthState(authUser, AccessToken);

    window.localStorage.setItem(TOKEN_KEY, AccessToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(authUser));
  }

  function signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setAuthState(undefined, '');
    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signed,
        token,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
