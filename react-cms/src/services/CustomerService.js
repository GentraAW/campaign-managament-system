import axios from "axios";

const API_URL = "http://localhost:8080/customers";

class CustomerService {
  getAllCustomers() {
    return axios.get(API_URL);
  }

  getCustomerById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createCustomer(customer) {
    return axios.post(API_URL, customer);
  }

  updateCustomer(id, customer) {
    return axios.put(`${API_URL}/${id}`, customer);
  }

  deleteCustomer(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new CustomerService();
