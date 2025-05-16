import { apiClient } from '../client';

type CredentialsProps = {
    login: string,
    password: string,
}

type userDataProps = {
  first_name: string,
  second_name: string,
  login: string,
  super_rights: string,
  password: string,
}

export const authService = {
  async loginLogist(credentials: CredentialsProps) {
    return apiClient.post('/loginLogist', credentials);
  },

  async registerLogist(userData: userDataProps) {
    return apiClient.post('/addLogist', userData);
  }
};