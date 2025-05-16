import { apiClient } from '../client';

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

type newDeliveryProps = {
  from: string,
  from_address: string,
  to: string, 
  to_address: string,
  product_id: number,
  amount: number,
  datetime: string,
  id: string,
}

export const itemService = {
  async getProducts() {
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
  },
  async addDelivery(newDelivery: newDeliveryProps) {
    return apiClient.post("/addDelivery", newDelivery)
  },
  async getAvailableDrivers(){
    return apiClient.get("/getAvailableDrivers")
  },
  async getDeliveryHistory(){
    return apiClient.get("/getDeliveryHistory")
  }
};