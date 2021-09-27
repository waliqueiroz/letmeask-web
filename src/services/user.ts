import { objectToSnake } from 'ts-case-convert/lib/caseConvert';

import api from './api';
import { User } from '../pages/SignUp';

export async function signUp(user: User): Promise<void> {
  await api.post('users', objectToSnake(user));
}
