import { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { WithAxios } from './WithAxios';

import { setAuthorizationHeader } from '../services/api';
import { login } from '../services/auth';

type AuthContextProviderProps = {
  children: ReactNode;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthData = {
  user: User;
  accessToken: string;
  tokenType: string;
  expiresIn: string;
};

export type AuthContextData = {
  user: User | undefined;
  token: string;
  signed: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  function setAuthState(authUser: User | undefined, currentToken: string) {
    setUser(authUser);
    setToken(currentToken);
    setSigned(authUser !== undefined);

    setAuthorizationHeader(currentToken);
  }

  useEffect(() => {
    const currentToken = window.localStorage.getItem(TOKEN_KEY);
    const userSerialized = window.localStorage.getItem(USER_KEY);

    if (userSerialized != null && currentToken != null) {
      const authUser = JSON.parse(userSerialized);
      setAuthState(authUser, currentToken);
    }

    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    const data = await login(email, password);

    const { user: authUser, accessToken } = data;

    setAuthState(authUser, accessToken);

    window.localStorage.setItem(TOKEN_KEY, accessToken);
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
        loading,
        token,
        signOut,
      }}
    >
      <WithAxios>{children}</WithAxios>
    </AuthContext.Provider>
  );
};
