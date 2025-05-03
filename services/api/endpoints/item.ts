import { apiClient } from '../client';

type productProps = {
    id: string
}

type newDriverProps = {
  firstName: string
  secondName: string
  sex: string
  experience: number
  age: number
  category: string[],
  login: string,
  password: string,
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
  },
  async addDriver(newDriver: newDriverProps) {
    return apiClient.post("/addDriver", newDriver)
  }
};