import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export function setAuthorizationHeader(token: string): void {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default api;
