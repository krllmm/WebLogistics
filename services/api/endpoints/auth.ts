import { apiClient } from '../client';

type CredentialsProps = {
    login: string,
    password: string,
}

type userDataProps = {
    login: string
}

export const authService = {
  async loginLogist(credentials: CredentialsProps) {
    return apiClient.post('/loginLogist', credentials);
  },

  async registerLogist(userData: userDataProps) {
    return apiClient.post('/registerLogist', userData);
  },

  async me(userData: userDataProps) {
    return apiClient.get("/me", userData)
  }
};