import { apiClient } from '../client';

type productProps = {
    id: string
}

export const itemService = {
  async getProduct() {
    return apiClient.get('/getProducts');
  },
  async getDeliveries() {
    return apiClient.get('/getAllDeliveries');
  },
  async getAllDrivers() {
    return apiClient.get('/getAllDrivers');
  }
};