import axios from "axios";

const API_URL = "http://localhost:8080/email-mass-logs";
const API_URL2 = "http://localhost:8080/api/mass-email/send";

class TrialMassService {
  getAllTrialMessage() {
    return axios.get(API_URL);
  }

  startTrialMass(id) {
    return axios.post(`${API_URL2}/${id}`);
  }
}

export default new TrialMassService();
