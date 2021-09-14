import { objectToCamel } from 'ts-case-convert/lib/caseConvert';

import api from './api';
import { AuthData } from '../contexts/AuthContext';

export async function login(
  email: string,
  password: string,
): Promise<AuthData> {
  const { data } = await api.post('login', {
    email,
    password,
  });

  return objectToCamel<AuthData>(data);
}
